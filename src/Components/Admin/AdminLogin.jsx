import React,{ useState,useContext,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import Loading from '../Loading';

import adminContext from '../Context/Admin/createAdminContext';

function AdminLogin() {

  const adminToken = "ad1to2ken3";
  const navigate = useNavigate();
  const location = useLocation();

  const adminContextData = useContext(adminContext);
  const {loadingState,loginAsAdmin} = adminContextData;

  const [userData,setUserData] = useState({email:"",password:""});
  const onchange = (e)=>{
    const {name,value} = e.target;
    setUserData({...userData,[name]:value});
  }

  useEffect(()=>{
    if(location.pathname.startsWith("/admin/_admin") && localStorage.getItem(adminToken))
      navigate("/admin/_admin/dashboard");

    // eslint-disable-next-line
  },[]);

  //  //! Submit login button...
  const loginSubmit = async(e)=>{
    e.preventDefault();
    await loginAsAdmin(userData)
    await navigate("/admin/_admin/dashboard")
  }

  return (
    <>
    <div className='pt-10 flex justify-center items-center'>
      <div className='py-5 px-3'>
        <div className='text-center'>
          <h3 className='text-xl text-green-500 font-serif font-medium'>Admin Login</h3>
        </div>
        <div className='flex flex-wrap justify-center items-center'>
            <div className='pt-5'>
              <form onSubmit={loginSubmit}>
                <div className='mb-2'>
                  <label htmlFor="email">Email</label> <br />
                  <input onChange={onchange} className='ring-1 ring-green-600 focus:ring-blue-600 rounded-sm outline-none px-2 py-1' type="email" name="email" />
                </div>
                <div className='mb-2'>
                  <label htmlFor="password">Password</label> <br />
                  <input onChange={onchange} className='ring-1 ring-green-600 focus:ring-blue-600 rounded-sm outline-none px-2 py-1' type="text" name='password' />
                </div>
                <div className='mt-2 text-right'>
                  <input className='bg-green-500 px-3 py-2 rounded-md text-white focus:ring-1 ring-green-800 cursor-pointer' type="submit" value={"Login"}/>
                </div>
              </form>
            </div>
        </div>
        <div>
          <Loading state={loadingState}/>
        </div>
      </div>
    </div>
  </>
  )
}

export default AdminLogin