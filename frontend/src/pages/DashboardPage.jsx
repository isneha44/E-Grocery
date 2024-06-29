import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [image_url, setImage_url] = useState("https://res.cloudinary.com/dldtrjalo/image/upload/v1719650373/default-store-350x350_ef9nvw.jpg");
  const [price, setPrice] = useState("0");
  const [qty, setQty] = useState("0");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/");
    }
  }, [user]);

  const createProduct = async () => {
    setLoading(true);
    if(!name || !price || !qty){
      toast.error("Please fill all the fields");
      setLoading(false);
      return
    }
    try {
      const res = await axios.post("http://localhost:3000/api/product/create", {
        name,
        image_url,
        countInStock: qty,
        price,
      });
     
      if (res.data.status == "success") {
        toast.success(res.data.message);
      }
      if(res.data.status == "failed"){
        toast.error(res.data.message);
      }
      setName("");
      setImage_url("");
      setPrice("0");
      setQty("0");
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="p-1">
      <h1 className="md:text-3xl justify-center text-xl font-semibold  text-center mt-20  my-5 opacity-65">
        Dashboard
      </h1>
      <div>
        <div className="max-w-xl mx-auto grid  font-roboto items-center ">
          <div className="md:p-20 p-5 ">
            <div className="text-center">
              <p className="text-[20px] font-semibold">Add a Product</p>
            </div>

            <div className="mt-10">
              <p className="text-[16px]">Product name</p>
              <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="outline-none border text-[16px] bg-white w-full h-[50px] rounded-lg px-3 mt-2"
              />
            </div>
            <div className="mt-10">
              <p className="text-[16px]">Image Url</p>
              <input
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
                type="text"
                className="outline-none border text-[16px] bg-white w-full h-[50px] rounded-lg px-3 mt-2"
              />
            </div>
            <div className="mt-10">
              <p className="text-[16px]">Qty</p>
              <input
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                className="outline-none border bg-white w-full h-[50px] rounded-lg p-3 mt-2"
                type="number"
              />
            </div>
            <div className="mt-10">
              <p className="text-[16px]">Price</p>
              <input
              value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none border bg-white w-full h-[50px] rounded-lg p-3 mt-2"
                type="number"
              />
            </div>

            <button
              onClick={createProduct}
              className="bg-primary mt-5 text-white w-full h-[50px] rounded-lg   font-semibold text-[24px]"
            >
              {loading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
