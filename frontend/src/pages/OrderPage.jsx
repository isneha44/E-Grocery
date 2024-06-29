import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const OrderPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);

  const getAllOrder = async () => {
    const res = await axios.post(`http://localhost:3000/api/cart/order/get-all/${user._id}`);
    console.log(res.data)
    setData(res.data.carts)
  }
  useEffect(() => {
    getAllOrder();
  }, [])

  return (
    <div className="max-w-7xl mx-auto min-h-screen pt-1 ">
      <h1 className="md:text-3xl text-xl font-semibold  text-center mt-20  my-5 opacity-65">
        Order
      </h1>

      <div>
        {data.length > 0 ? (

          <table className="table-auto w-full mt-10">
          <thead>
            <tr className="text-2xl border">
              <th >Product</th>
              <th >Qty</th>
              <th >Price</th>
              <th >Status</th>

            </tr>
          </thead>
          <tbody className="text-xl border">
            {(data || []).map((item, index) => (
               <tr className="" key={index}>
               <td>{item?.productId?.name}</td>
               <td>{item?.quantity}</td>
               <td>{item?.productId?.price}</td>
               <td>Payment</td>
             </tr>
            ))}
          </tbody>
        </table>
          ) : (
            <h1 className="text-center text-[20px] mt-10">No Order</h1>
          )}
      </div>
    </div>
  );
};

export default OrderPage;
