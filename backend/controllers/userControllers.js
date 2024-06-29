import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const findUser = await User.findOne({ email: email });
    console.log(findUser);
    if (findUser) {
      res
        .json({
          status: "failed",
          message: "User already exist",
        })
        .status(200);
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = await User.create({ username, email, password: hash });
      newUser.save();
      res
        .json({
          status: "success",
          message: "User created successfully",
        })
        .status(201);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = req.body;
    const userFind = await User.findOne({ email: user.email });

    if (userFind) {
      const validity = bcrypt.compareSync(user.password, userFind.password);
      if (validity) {
        const token = jwt.sign(
          {
            _id: userFind._id,
          },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = userFind._doc;

        res.status(200).json({
          status: "success",
          message: "Login successful",
          token: token,
          user: rest,
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "Invalid credentials",
        });
      }
    }else{
      res.status(200).json({
        status: "failed",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};
