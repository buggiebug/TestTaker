import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import {toast} from "react-toastify";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userToken = "user12Tok34en";
  const logoutUser = () => {
    localStorage.removeItem(userToken);
    navigate("/login", { replace: true });
    toast.success("Logout successfully.")
  };

  return (
    <>
      <nav
        className={`${
          location.pathname.startsWith("/admin") ? "hidden" : "block"
        } bg-gray-900 text-white`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <Link to="/" className="flex items-center">
            <img
              onClick={() => {}}
              src={logo}
              className="h-6 mr-3 sm:h-9"
              alt="logo"
            />
            <span className="self-center text-xl font-mono font-semibold whitespace-nowrap">
              TestTaker
            </span>
          </Link>
          {
            localStorage.getItem(userToken)?
            <div className="flex flex-warp justify-center items-center">
              <Link to="/dashboard" className="contents mx-2 cursor-pointer"><i className="fa-solid fa-user ml-1 hover:opacity-80"></i></Link>
              <p onClick={() => {logoutUser();}} className="font-medium mx-2 ml-8 hover:underline cursor-pointer"> Logout </p>
            </div>
            :
            <div className="flex justify-center items-center">
              <Link to="/login" className="text-sm font-medium hover:underline mx-1 cursor-pointer">
                Login <i className="fa-solid fa-user ml-1"></i>
              </Link>
            </div>
          }
        </div>
      </nav>
      <nav
        className={`${
          location.pathname.startsWith("/admin") ? "hidden" : "block"
        } bg-gray-700`}
      >
        <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6 text-white">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:underline"
                >
                  Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:underline"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
