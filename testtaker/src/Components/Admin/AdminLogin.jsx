import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Loading from "../Loading";

import adminContext from "../Context/Admin/createAdminContext";
function AdminLogin() {
  const location = useLocation();

  const adminToken = "ad1to2ken3";
  const navigate = useNavigate();

  const adminContextData = useContext(adminContext);
  const { loadingState, loginAsAdmin } = adminContextData;

  const [userData, setUserData] = useState({ email: "", password: "" });
  const onchange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (
      location.pathname.startsWith("/admin/_admin") &&
      localStorage.getItem(adminToken)
    )
      navigate("/admin/_admin/dashboard");

    // eslint-disable-next-line
  }, []);

    //  //! Submit login button...
    const adminLoginSubmit = async(e)=>{
      e.preventDefault();
      const res = await loginAsAdmin(userData);
      if(res)
        await navigate("/admin/_admin/dashboard",{replace:true})
    }
  

  return (
    <div className="grid place-items-center h-[100vh] mx-2">
      <div className="loginSignup">
        <div className="login formDesign">
          <header>
            <div className="flex justify-between">
              <Link to="/login">Login</Link>
              <Link
                to="/admin/_admin"
                style={
                  location.pathname === "/admin/_admin"
                    ? { color: "red", textDecoration: "underline" }
                    : { color: "black" }
                }
              >
                Admin
              </Link>
            </div>
          </header>
          <form onSubmit={adminLoginSubmit}>
            <input type="text" name="email" onChange={onchange} placeholder="Enter your email" />
            <input type="password" name="password" onChange={onchange} placeholder="Enter your password" />
            <button className="btn">
              {loadingState?<i className="fa-solid fa-spinner animate-spin"></i>
              :'Admin Login'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
