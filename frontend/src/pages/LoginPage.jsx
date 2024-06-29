import { Link } from "react-router-dom";
import loginimage from "../assets/login-side-image.jpg";
import loginBg from "../assets/loginbg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, [user, token]);

  const dispatch = useDispatch();

  const Login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
      });
      if (res.data.status === "success") {
        setIsLoading(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data));
      } else if (res.data.status === "failed") {
        setIsLoading(false);
        toast.error(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div
      className=" w-full  p-1 min-h-screen md:h-full bg-cover"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="max-w-7xl  md:mx-auto overflow-hidden my-10 mx-3 rounded-[10px] py-5 bg-white drop-shadow-xl">
        <div className="w-full   grid md:grid-cols-2 font-roboto items-center">
          <div className="md:p-20 p-5">
            <h1 className="font-semibold text-[40px] text-primary">Login</h1>
            <p className="text-[20px] font-semibold">
              Please Login to continue
            </p>

            <div className="mt-10">
              <p className="text-[16px]">Email</p>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
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
              <div className="w-[20px] h-[20px] border border-2 rounded-md border-black"></div>
              <p
                className="
          text-[16px] font-semibold"
              >
                Remember me
              </p>
            </div>
            <button
              className="bg-primary  text-white w-full h-[50px] rounded-lg   font-semibold text-[24px]"
              onClick={Login}
            >
              {isloading ? "" : "Login"}
              <ClipLoader
                color="#ffffff"
                loading={isloading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
            <p className="text-[16px] mt-3 font-semibold">
              {`Don't have an account`}
              <Link to="/register" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>

          <div className="w-full h-full hidden md:block">
            <img
              className="w-full h-full object-cover scale-105"
              src={loginimage}
              alt="login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
