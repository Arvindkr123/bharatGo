import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { BiSolidCart } from "react-icons/bi";
import { FaBoxArchive } from "react-icons/fa6";
import { MdAccountBox } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import useGetUserDetails from "../hooks/useGetUserDetails";
import { auth } from "../firebase.config";
import useCartContext from "../hooks/useCartContext";
import CartItems from "./CartItems";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user } = useGetUserDetails();

  const isActive = (route) => pathname.includes(route);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { label: "All", path: "/home" },
    { label: "Clothes", path: "/clothes" },
    { label: "Electronics", path: "/electronics" },
    { label: "Furnitures", path: "/furnitures" },
    { label: "Toys", path: "/toys" },
  ];

  const logoutHandler = async () => {
    await auth.signOut();
  };

  const { showCart, openShowCartHandler } = useCartContext();

  return (
    <>
      <div className="sticky top-0 p-3 z-40 sm:py-5 sm:px-8 bg-white flex justify-between shadow">
        <div className="left flex gap-x-3 items-center">
          <h1
            onClick={() => navigate("/home")}
            className="hidden sm:block font-mono text-xl cursor-pointer"
          >
            Shopi
          </h1>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={clsx("text-sm font-normal", {
                "border-b-2": isActive(link.path),
              })}
              to={link.path}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden right md:flex gap-x-3 items-center">
          <h1>{user?.email}</h1>
          <Link
            className={clsx("text-sm font-normal", {
              "border-b-2": isActive("/myOrders"),
            })}
            to="/myOrders"
          >
            My Orders
          </Link>
          <Link
            className={clsx("text-sm font-normal", {
              "border-b-2": isActive("/myAccount"),
            })}
            to="/myAccount"
          >
            My Account
          </Link>
          <p
            onClick={() => openShowCartHandler()}
            className="text-sm font-normal cursor-pointer"
          >
            🛒 0
          </p>
          <button
            onClick={logoutHandler}
            className="p-2 bg-gray-600 text-white cursor-pointer hover:bg-gray-500 transition-all ease-in rounded"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden inline-flex items-center justify-center cursor-pointer bg-white text-black relative">
          <FaUserCircle
            onClick={() => setShowUserMenu((prev) => !prev)}
            size={20}
          />
          {showUserMenu && (
            <div
              ref={userMenuRef}
              className="absolute right-3 top-5 border-2 max-w-sm rounded-md p-3 bg-gray-500"
            >
              <p className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white p-1">
                <FaUser />
                <span>{user?.email}</span>
              </p>
              <p
                onClick={() => navigate("/myOrders")}
                className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white p-1"
              >
                <FaBoxArchive />
                <span>My Orders</span>
              </p>
              <p
                onClick={() => navigate("/myAccount")}
                className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white p-1"
              >
                <MdAccountBox />
                <span>My Account</span>
              </p>
              <p
                onClick={() => openShowCartHandler()}
                className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white p-1 cursor-pointer"
              >
                <BiSolidCart />
                <span>5</span>
              </p>
              <button
                onClick={logoutHandler}
                className="p-2 bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-all ease-in rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {showCart && <CartItems />}
    </>
  );
};

export default Header;
