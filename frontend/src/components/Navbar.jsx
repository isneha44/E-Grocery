import { useEffect, useState } from "react";
import logo from "../assets/grocery-logo.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import { LuUser2 } from "react-icons/lu";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "../features/authSlice";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
  }, [user, token]);

  const [open, setOpen] = useState(false);
  return (
    <div
      className={`fixed w-full bg-white  ${open ? "" : "bg-opacity-35"} z-10`}
    >
      <div className="max-w-7xl mx-auto justify-between flex p-5">
        <Link to="/">
          <img src={logo} className="h-5" />
        </Link>

        <div className=" gap-5 items-center hidden sm:flex">
          <Link to="/cart">
            <RiShoppingCartLine
              size={20}
              className="hover:text-primary transition-all"
            />
          </Link>
          <div className="flex gap-2 items-center">
            <LuUser2 size={20} />
            <p className="font-semibold">{user ? user.username : null}</p>
          </div>
          {(user?.isAdmin) && (
            <Link to="/dashboard">
              <MdDashboard size={20} />
            </Link>
          )}
          <button onClick={() => dispatch(logout())}>
            <IoMdLogOut size={20} />
          </button>
        </div>
        <div className="sm:hidden hover:text-primary transition-all">
          <button onClick={() => setOpen(!open)}>
            {open ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
          </button>
        </div>
      </div>
      <div
        className={`justify-center grid overflow-hidden transition-all duration-100 text-center  gap-3 ${
          open ? "h-40" : "h-0"
        }`}
      >
        <div className="flex gap-2 justify-center items-center hover:text-primary transition-all">
          <LuUser2 size={20} />
          <p className="font-semibold">Imalka Gayani</p>
        </div>
        <Link to="/cart">
          <div className="flex gap-2 justify-center items-center hover:text-primary transition-all">
            <RiShoppingCartLine size={20} />
            <p className="font-semibold">Cart</p>
          </div>
        </Link>
        <div className="flex gap-2 mb-5 justify-center items-center hover:text-primary transition-all">
          <FiLogOut size={20} />
          <p className="font-semibold">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
