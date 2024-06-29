import { Link, useNavigate } from "react-router-dom";
import regImage from "../assets/reg-sife-image.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, [user, token]);

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        email,
        username,
        password,
      });
      if (res.data.status === "success") {
        toast.success(res.data.message);
      } else if (res.data.status === "failed") {
        toast.error(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className=" w-full  p-1 min-h-screen md:h-full bg-cover"
      style={{ backgroundImage: `url(${regImage})` }}
    >
      <div className="max-w-7xl  md:mx-auto overflow-hidden my-10 mx-3 rounded-[10px] py-5 bg-white drop-shadow-xl">
        <div className="w-full   grid md:grid-cols-2 font-roboto items-center">
          <div className="md:p-20 p-5">
            <h1 className="font-semibold text-[40px] text-primary">Signup</h1>
            <p className="text-[20px] font-semibold">
              Please Signup to continue
            </p>
            <div className="mt-10">
              <p className="text-[16px]">Username</p>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="outline-none border text-[16px] bg-white w-full h-[50px] rounded-lg px-3 mt-2"
              />
            </div>
            <div className="mt-10">
              <p className="text-[16px]">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="outline-none border text-[16px] bg-white w-full h-[50px] rounded-lg px-3 mt-2"
              />
            </div>
            <div className="mt-10">
              <p className="text-[16px]">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none border bg-white w-full h-[50px] rounded-lg p-3 mt-2"
                type="password"
              />
            </div>
            <div className="flex opacity-30 items-center my-5 gap-2">
              <div className="w-[20px] h-[20px]  border-2 rounded-md border-black"></div>
              <p
                className="
            text-[16px] font-semibold"
              >
                Remember me
              </p>
            </div>
            <button
              onClick={register}
              className="bg-primary  text-white w-full h-[50px] rounded-lg   font-semibold text-[24px]"
            >{isloading ? "" : "Register"}
              <ClipLoader
                color="#ffffff"
                loading={isloading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
            <p className="text-[16px] mt-3 font-semibold">
              Already have an account{" "}
              <Link to="/login" className="text-primary">
                Log in
              </Link>
            </p>
          </div>
          <div className="w-full h-full hidden md:block">
            <img
              className="w-full h-full object-cover scale-105"
              src={regImage}
              alt="login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
