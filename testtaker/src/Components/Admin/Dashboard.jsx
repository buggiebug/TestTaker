import { useEffect,useContext } from "react";
import { useNavigate, useLocation,Link } from "react-router-dom";

import Loading from "../Loading";

import adminContext from "../Context/Admin/createAdminContext";
function Dashboard() {

  const adminContextData = useContext(adminContext);
  const {loadingState,dashboardData1,dashboardData2,adminProfile} = adminContextData;


  const adminToken = "ad1to2ken3";
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem(adminToken))
      adminProfile();

    if (!localStorage.getItem(adminToken)) navigate("/");
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div className="mt-10 pt-[180px] md:p-14">
      <h3 className="text-center mt-10 text-2xl text-white">Dashboard</h3>
      {loadingState===true?<Loading state={true}/>:
      <div>
        <div className="mt-10 ml-10 flex justify-between">
            <div>
              <p className="text-sm text-white">Hello, <span className="font-mono font-semibold text-lg text-white">{dashboardData2.name}</span></p>
              <p className="text-sm text-white">Email : <span className="font-medium text-white">{dashboardData2.email}</span></p>
            </div>
            <p className="text-sm text-right mr-10 text-white">Role : <span className="font-medium">{String(dashboardData2.role).charAt(0).toUpperCase() + String(dashboardData2.role).slice(1)}</span></p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center items-center ">
          <Link to={`${dashboardData2.role ==="admin"?"/admin/_admin/sub-admin":"/admin/_admin/dashboard"}`}
            className={`${dashboardData2.role==="admin"?"flex":"hidden"} justify-center items-center my-2 mx-2 h-[40vh] w-[40vh] bg-white transition hover:bg-gray-300 text-black rounded-md shadow-md hover:translate-y-1 cursor-pointer`}
          >
            <div className="">
              <h3 className="text-2xl ">Sub-Admins</h3>
              <h2 className="mt-5 text-center text-xl">{dashboardData1.allAdminsCount}</h2>
            </div>
          </Link>
          <Link to={`${dashboardData2.role ==="admin"?"/admin/_admin/users":"/admin/_admin/dashboard"}`}
            className={`${dashboardData2.role==="admin"?"flex":"hidden"} justify-center items-center my-2 mx-2 h-[40vh] w-[40vh] bg-white hover:bg-gray-300 text-black rounded-md shadow-md hover:translate-y-1 cursor-pointer`}
          >
            <div className="">
              <h3 className="text-2xl">User's</h3>
              <h2 className="mt-5 text-center text-xl">{dashboardData1.allUsersCount}</h2>
            </div>
          </Link>
          <Link to={`${dashboardData2.role ==="admin"?"/admin/_admin/users/testtaken":"/admin/_admin/dashboard"}`}
            className={`${dashboardData2.role==="admin"?"flex":"hidden"} justify-center items-center my-2 mx-2 h-[40vh] w-[40vh] bg-white hover:bg-gray-300 text-black rounded-md shadow-md hover:translate-y-1 cursor-pointer`}
          >
            <div className="">
              <h3 className="text-2xl">All Test</h3>
              <h2 className="mt-5 text-center text-xl">{dashboardData1.totalTestCount}</h2>
            </div>
          </Link>
          <Link to={"/admin/_admin/questions"}
            className={`flex justify-center items-center my-2 mx-2 h-[40vh] w-[40vh] bg-white hover:bg-gray-300 transition text-black rounded-md shadow-md hover:translate-y-1 cursor-pointer`}
          >
            <div className="">
              <h3 className="text-2xl">Questions</h3>
              <h2 className="mt-5 text-center text-xl">{dashboardData1.questionCount}</h2>
            </div>
          </Link>
        </div>
      </div>
      }
    </div>
  );
}

export default Dashboard;
