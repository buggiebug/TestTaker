import { useEffect,useContext } from "react";
import { useNavigate, useLocation,Link } from "react-router-dom";

import Loading from "../Loading";

import adminContext from "../Context/Admin/createAdminContext";
function Dashboard() {

  const adminContextData = useContext(adminContext);
  const {loadingState,dashboardData1,dashboardData2,myProfile} = adminContextData;


  const adminToken = "ad1to2ken3";
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem(adminToken))
      myProfile();

    if (!localStorage.getItem(adminToken)) navigate("/");
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div className="mt-10">
      <h3 className="text-center mt-10 text-2xl">Dashboard</h3>
      <div className="mt-10 ml-10">
          <p className="text-sm">Hello, <span className="font-mono font-semibold text-lg">{dashboardData2.name}</span></p>
          <p className="text-sm">Email : <span className="font-medium">{dashboardData2.email}</span></p>
          <p className="text-sm text-right mr-10">Role : <span className="font-medium">{String(dashboardData2.role).charAt(0).toUpperCase() + String(dashboardData2.role).slice(1)}</span></p>
      </div>
      <div className="mt-10 flex flex-wrap justify-center items-center">
        <Link to={`${dashboardData2.role ==="admin"?"/admin/_admin/sub-admin":"/admin/_admin/dashboard"}`}
          className={`${dashboardData2.role==="admin"?"flex":"hidden"} justify-center items-center my-2 mx-2 h-[40vh] w-[40vh] bg-gray-400 hover:bg-gray-500 text-black rounded-md shadow-md hover:translate-y-1 cursor-pointer`}
        >
          <div className="">
            <h3 className="text-2xl">Sub-Admins</h3>
            <Loading state={loadingState}/>
            <h2 className="mt-5 text-center text-xl">{dashboardData1.allAdminsCount}</h2>
          </div>
        </Link>
        <Link to={`${dashboardData2.role ==="admin"?"/admin/_admin/users":"/admin/_admin/dashboard"}`}
          className={`${dashboardData2.role==="admin"?"flex":"hidden"} justify-center items-center my-2 mx-2 h-[40vh] w-[40vh] bg-gray-400 hover:bg-gray-500 text-black rounded-md shadow-md hover:translate-y-1 cursor-pointer`}
        >
          <div className="">
            <h3 className="text-2xl">Students</h3>
            <Loading state={loadingState}/>
            <h2 className="mt-5 text-center text-xl">{dashboardData1.allUsersCount}</h2>
          </div>
        </Link>
        <Link to={"/admin/_admin/questions"}
          className={`flex justify-center items-center my-2 mx-2 h-[40vh] w-[40vh] bg-gray-400 hover:bg-gray-500 text-black rounded-md shadow-md hover:translate-y-1 cursor-pointer`}
        >
          <div className="">
            <h3 className="text-2xl">Questions</h3>
            <Loading state={loadingState}/>
            <h2 className="mt-5 text-center text-xl">{dashboardData1.questionCount}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
