import React,{useContext,useEffect} from 'react'
import {Link,useNavigate,useLocation} from "react-router-dom";
import logo from "../Images/logo.png";

import adminContext from '../Context/Admin/createAdminContext';

import {toast} from "react-toastify";

function AdminNavbar() {

  const adminContextData = useContext(adminContext);
  const {dashboardData2,adminProfile} = adminContextData;

  const adminToken = "ad1to2ken3";
  const location = useLocation();  
  const navigate = useNavigate();  


  useEffect(()=>{
    if(localStorage.getItem(adminToken))
      adminProfile()
    // eslint-disable-next-line
  },[])

  const logout = ()=>{
    localStorage.removeItem(adminToken);
    toast.info(`${dashboardData2.name} Logout !`)
    navigate("/");
  }

  return (
    <>
    <div className={`${location.pathname.startsWith("/admin/_admin") && localStorage.getItem(adminToken)?"block":"hidden"} bg-white pb-5 md:h-16 text-black fixed top-0 w-full z-50`}>
        <header className="mt-2 px-3 flex flex-wrap justify-center md:justify-between items-center">
            <Link to={"/admin/_admin/dashboard"} className='ml-3 flex justify-center items-center'>
                <img className='h-8 mr-3 sm:h-9' src={logo} alt="logo" />
                <span className='ml-3 font-mono text-xl'>TestTaker</span>
            </Link>
            <nav className="flex flex-wrap justify-center md:my-0 my-2 text-lg">
                <Link to={`/admin/_admin/dashboard`} className={`mr-5 my-2 ${location.pathname==="/admin/_admin/dashboard"?" font-semibold":" hover:underline"}`}>Dashboard</Link>
                <Link to={`${dashboardData2.role==="admin"?"/admin/_admin/sub-admin":"/admin/_admin/dashboard"}`} className={`${dashboardData2.role==="admin"?"visible":"hidden"} mr-5 my-2 ${location.pathname==="/admin/_admin/sub-admin"?" font-semibold":" hover:underline"} `}>Sub Admin</Link>
                <Link to={`${dashboardData2.role==="admin"?"/admin/_admin/users":"/admin/_admin/dashboard"}`} className={`${dashboardData2.role==="admin"?"visible":"hidden"} mr-5 my-2 ${location.pathname==="/admin/_admin/users"?" font-semibold":" hover:underline"} `}>User's</Link>
                <Link to={`/admin/_admin/questions`} className={`mr-5 my-2 ${location.pathname==="/admin/_admin/questions"?" font-semibold":" hover:underline"} `}>Questions</Link>
                <Link to={`${dashboardData2.role==="admin"?"/admin/_admin/users/testtaken":"/admin/_admin/dashboard"}`} className={`${dashboardData2.role==="admin"?"visible":"hidden"} mr-5 my-2 ${location.pathname==="/admin/_admin/users/testtaken"?" font-semibold":" hover:underline"} `}>Test Taken</Link>
            </nav>
            <div className='mr-3'>
                <button onClick={()=>{logout()}} className='ring-1 ring-red-200 hover:underline px-5 py-1 rounded-md'>Logout</button>
            </div>
        </header>
    </div>
    </>
  )
}

export default AdminNavbar