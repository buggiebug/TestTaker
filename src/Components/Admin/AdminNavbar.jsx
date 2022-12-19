import React,{useContext,useEffect} from 'react'
import {Link,useNavigate,useLocation} from "react-router-dom";
import logo from "../Images/logo.png";

import adminContext from '../Context/Admin/createAdminContext';

import {toast} from "react-toastify";

function AdminNavbar() {

  const adminContextData = useContext(adminContext);
  const {dashboardData2,myProfile} = adminContextData;

  const adminToken = "ad1to2ken3";
  const location = useLocation();  
  const navigate = useNavigate();  


  useEffect(()=>{
    if(localStorage.getItem(adminToken))
      myProfile()
    // eslint-disable-next-line
  },[])

  const logout = ()=>{
    localStorage.removeItem(adminToken);
    toast.info(`${dashboardData2.name} Logout !`)
    navigate("/");
  }

  return (
    <>
    <div className={`${location.pathname.startsWith("/admin/_admin") && localStorage.getItem(adminToken)?"block":"hidden"} mb-10`}>
        <header className="mt-2 px-3 flex flex-wrap justify-around items-center">
            <Link to={"/admin/_admin/dashboard"} className='ml-3 flex justify-center items-center'>
                <img className='h-8 mr-3 sm:h-9' src={logo} alt="logo" />
                <span className='ml-3 font-mono text-xl test-gray-500'>TestTaker</span>
            </Link>
            <nav className="overflow-hidden">
                <Link to={`/admin/_admin/dashboard`} className={`mr-5 ${location.pathname==="/admin/_admin/dashboard"?"text-black font-semibold":"text-gray-500"} hover:text-gray-900`}>Dashboard</Link>
                <Link to={`${dashboardData2.role==="admin"?"/admin/_admin/sub-admin":"/admin/_admin/dashboard"}`} className={`${dashboardData2.role==="admin"?"visible":"hidden"} mr-5 ${location.pathname==="/admin/_admin/sub-admin"?"text-black font-semibold":"text-gray-500"} hover:text-gray-900`}>Sub Admin</Link>
                <Link to={`${dashboardData2.role==="admin"?"/admin/_admin/users":"/admin/_admin/dashboard"}`} className={`${dashboardData2.role==="admin"?"visible":"hidden"} mr-5 ${location.pathname==="/admin/_admin/users"?"text-black font-semibold":"text-gray-500"} hover:text-gray-900`}>User's</Link>
                <Link to={`/admin/_admin/questions`} className={`mr-5 ${location.pathname==="/admin/_admin/questions"?"text-black font-semibold":"text-gray-500"} hover:text-gray-900`}>Questions</Link>
            </nav>
            <div className='mr-3'>
                <button onClick={()=>{logout()}} className='text-gray-500 px-3 py-2 rounded-md hover:bg-slate-200'>Logout</button>
            </div>
        </header>
    </div>
    </>
  )
}

export default AdminNavbar