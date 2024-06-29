import Cart from "../models/cartModel.js";

export const cartCreate = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const newCart = new Cart({
      userId,
      productId,
      quantity,
    });

    const savedCart = await newCart.save();

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      cart: savedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

export const cartDelete = async (req, res) => {
  try {
    const cartId = req.params.id;

    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting from cart",
      error: error.message,
    });
  }
};

export const payment = async (req, res) => {
  try {
    const { cartId } = req.params;

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { paymentStatus: true },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating payment status",
      error: error.message,
    });
  }
};

export const paymentAll = async (req, res) => {
  try {
    const { userId } = req.params;
    

    // Update all cart items for the user to paid status
    const result = await Cart.updateMany(
      { userId: userId, paymentStatus: false },
      { $set: { paymentStatus: true } }
    );
    console.log(result);

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No unpaid cart items found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully for all unpaid items",
      modifiedCount: result.nModified,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating payment status",
      error: error.message,
    });
  }
};

export const getAllCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const carts = await Cart.find({ userId , paymentStatus: false }).populate("productId");

    res.status(200).json({
      success: true,
      message: "Cart items retrieved successfully",
      carts: carts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving cart(s)",
      error: error.message,
    });
  }
};

export const getAllOrder = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const carts = await Cart.find({ userId , paymentStatus: true }).populate("productId");
  
      res.status(200).json({
        success: true,
        message: "Orderitems retrieved successfully",
        carts: carts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving Order(s)",
        error: error.message,
      });
    }
  };
