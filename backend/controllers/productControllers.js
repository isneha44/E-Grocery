import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const productFind = await Product.findOne({ name: product.name });
    if (productFind) {
      res
        .json({
          status: "failed",
          message: "Product already exist",
        })
        .status(400);
    } else {
      const newProduct =  await Product.create(product);
      newProduct.save();
      res
        .json({
          status: "success",
          message: "Product created successfully",
        })
        .status(201);
    }
  } catch (error) {
    res.status(500).json({
      status:"failed",
      message: error,
    });
  }
};

export const updateProduct =async (req, res) => {
  try {
    const product = req.body;
    const updatedProduct =  await Product.findByIdAndUpdate(req.params.id, product);
    if (!updatedProduct) {
      res
        .json({
          status: "failed",
          message: "Product not found",
        })
        .status(404);
    }else{
      res
        .json({
          status: "success",
          message: "Product updated successfully",
          updatedProduct,
        })
        .status(200);
    }
 
  } catch (error) {
    res.status(500).json({
      status:"failed",
      message: error,
      
    });
  }
};

export const getAllProducts =async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      status: "success",
      products: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status:"failed",
      message: error,
    });
  }
};

export const getAProduct =async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({
      status: "success",
      product: product,
      message: "Product fetched successfully",
    }).status(200);
  } catch (error) {
    res.status(500).json({
      status:"failed",
      message: error,
    });
  }
};

export const deleteProduct =async (req,res) => {
  try {
    const product =await Product.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Product deleted successfully",
    }).status(204);
  } catch (error) {
    res.status(500).json({
      status:"failed",
      message: error,
    });
  }
};
