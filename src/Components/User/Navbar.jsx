import React from "react";
import {Link,useLocation} from "react-router-dom";
import logo from "../Images/logo.png";

function Navbar() {

  const location = useLocation();

  return (
    <>
      <nav className={`${location.pathname.startsWith("/admin")?"hidden":"block"} bg-white border-gray-200 dark:bg-gray-900`}>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <Link to="/" className="flex items-center">
            <img
              onClick={()=>{}}
              src={logo}
              className="h-6 mr-3 sm:h-9"
              alt="logo"
            />
            <span className="self-center text-xl font-mono font-semibold whitespace-nowrap dark:text-white">
              TestTaker
            </span>
          </Link>
          <div className="flex justify-evenly items-center">
            {/* <Link
              to="/login"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Login
            </Link> */}
            <Link
              to="/admin/_admin"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>
      <nav className={`${location.pathname.startsWith("/admin")?"hidden":"block"} bg-gray-50 dark:bg-gray-700`}>
        <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-900 dark:text-white hover:underline"
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
