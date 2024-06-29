import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getAllCart = async () => {
    const res = await axios.post(
      `http://localhost:3000/api/cart/get-all/${user._id}`
    );
    console.log(res.data);
    setData(res.data.carts);
    calculateTotalPrice(res.data.carts);
  };

  const calculateTotalPrice = (carts) => {
    const total = carts.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedData = [...data];
    updatedData[index].quantity = quantity;
    setData(updatedData);
    calculateTotalPrice(updatedData);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${id}`);
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
      calculateTotalPrice(updatedData);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <div className="max-w-7xl mx-auto min-h-screen pt-1 ">
      <h1 className="md:text-3xl text-xl font-semibold text-center mt-20 my-5 opacity-65">
        Cart
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {(data || []).map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-2 md:p-5 drop-shadow-xl"
          >
            <img
              src={item.image_url}
              className="object-cover md:rounded-2xl rounded-lg"
              alt=""
            />
            <div className="w-full justify-between flex">
              <div>
                <p className="md:text-[20px] my-2 font-bold">
                  {item.productId.name}
                </p>
                <p className="md:text-[20px] font-semibold">
                  Rs <span>{item.productId.price}</span>
                </p>
                <p className="md:text-[20px] font-semibold">
                  QTY{" "}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    className="w-16 text-center"
                    min="1"
                  />
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white rounded-lg p-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length > 0 ? (
        <>
          <div className="w-full flex justify-center my-5">
            <h2 className="text-center text-[20px] font-bold">
              Total Price: Rs <span>{totalPrice}</span>
            </h2>
          </div>
          <div className="w-full flex justify-center my-10">
            <Link to="/payment">
              <button className="bg-primary text-white mx-auto h-[50px] rounded-lg font-semibold text-[24px] w-[200px]">
                Payment
              </button>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-center text-[20px] mt-10">No Cart Item</h1>
      )}
      <Link to="/order">
        <div className="flex justify-center">
          <button className="bg-gray-900 text-white mx-auto h-[50px] rounded-lg font-semibold text-[24px] w-[200px]">
            Your Order
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CartPage;
