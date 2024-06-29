
import { Link } from "react-router-dom";
import headerBg from "../assets/header.jpg";
import headerBg2 from "../assets/header2.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);

  const getAllProduct = async () => {
    const res = await axios.get("http://localhost:3000/api/product/getall");
    console.log(res.data);
    setData(res.data.products);
  };

  const addToCart = async (id) => {
    const data = {userId:user, productId:id, quantity:1}
    const res = await axios.post(`http://localhost:3000/api/cart/create`,
      data);
      if(res.data.success){
        toast.success("Product added to cart");
      }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div>
        <img src={headerBg} className="w-full h-screen object-cover" alt="" />
      </div>

      <div className=" max-w-7xl mx-auto h-screen items-center grid md:grid-cols-2 mt-10 px-2">
        <div className="order-2 md:order-1">
          <p className="md:text-xl text-primary">
            FARM-FRESH POULTRY AT YOUR FINGERTIPS
          </p>
          <p className="md:text-[36px] text-[24px] mt-2 font-semibold">
            TECH-RAISED, HEALTHY TURKEY GROCERY DELIVERED TO YOUR DOOR
          </p>
          <Link to="/product">
          <button className="bg-primary text-white text-sm py-3 px-6 mt-5 rounded-full font-bold">
            View Products
          </button>
          </Link>
        </div>
        <div className="md:p-5 md:order-2">
          <img src={headerBg2} className="object-cover rounded-xl" alt="" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="md:text-3xl text-xl font-semibold  text-center md:my-10 my-5 opacity-65">
          Our Products
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {/* cart 1 */}
      

          {(data || []).slice(0, 9).map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-2 md:p-5 drop-shadow-xl">
          <img
            src={item.image_url}
            className="object-cover md:rounded-2xl rounded-lg"
            alt=""
          />
          <div className="w-full justify-between flex">
            <div>
              <p className="md:text-[20px] my-2 font-bold">{item.name}</p>
              <p className="md:text-[20px] font-semibold">Rs <span>{item.price}</span></p>
            </div>
            <div>
              <button onClick={() => addToCart(item._id)} className="bg-primary text-white text-sm md:py-3 py-2 px-6 mt-5 rounded-full font-bold">
                Add cart
              </button>
            </div>
          </div>
        </div>
        ))}
       


        </div>
        <div className="flex justify-center mt-10"><Link to='/product' className="  md:text-[24px]  mt-5  font-bold cursor-pointer hover:text-primary transition-all">View All</Link></div>
      </div>
    </>
  );
};

export default HomePage;
