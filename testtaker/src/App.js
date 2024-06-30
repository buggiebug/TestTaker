import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./Components/User/Navbar";
import About from "./Components/User/About";
import Tests from "./Components/User/TestContent/Tests";
import StartTest from "./Components/User/TestContent/StartTest";
import SeeAnswer from "./Components/User/TestContent/SeeAnswer";
import PageNotFound from "./Components/PageNotFound";

import UserLogin from "./Components/User/UserLogin";
import UserDashboard from "./Components/User/UserDashboard";

//  //! Context...
import UseQuestionContext from "./Components/Context/Questions/useQuestionContext";
import UseAdminContext from './Components/Context/Admin/useAdminContext';
import UserContext from './Components/Context/User/UserContext';

// //! Admin Files...
import Questions from "./Components/Admin/Questions/Questions";
import AdminNavbar from "./Components/Admin/AdminNavbar";
import Dashboard from "./Components/Admin/Dashboard";
import AdminLogin from "./Components/Admin/AdminLogin";
import UpdateQuestion from "./Components/Admin/Questions/UpdateQuestion";
import SubAdmins from './Components/Admin/SubAdmins';
import AllUsers from './Components/Admin/AllUsers';
import TestTaken from './Components/Admin/TestTaken';

function App() {
  return (
    <>
    <UseAdminContext>
      <UserContext>
      <UseQuestionContext>
        <BrowserRouter>
          <Navbar />
          <AdminNavbar/>
          <ToastContainer theme="colored" limit={3} autoClose={2000} pauseOnHover={true}/>
          <Routes>
            <Route exect path="/" element={<Tests />} />
            <Route exect path="/start-test" element={<StartTest/>} />
            <Route exect path="/your-answer" element={<SeeAnswer/>} />
            <Route exect path="/about" element={<About />} />
            <Route exect path="/login" element={<UserLogin />} />
            <Route exect path="/dashboard" element={<UserDashboard />} />

            {/* //!  ADMIN Routes... */}
            <Route exect path="/admin/_admin" element={<AdminLogin/>}/>
            <Route exect path="/admin/_admin/dashboard" element={<Dashboard/>}/>
            <Route exect path="/admin/_admin/sub-admin" element={<SubAdmins/>}/>
            <Route exect path="/admin/_admin/users" element={<AllUsers/>}/>
            <Route exect path="/admin/_admin/users/testtaken" element={<TestTaken/>}/>
            <Route exect path="/admin/_admin/questions" element={<Questions/>}/>
            <Route exect path="/admin/_admin/question-update" element={<UpdateQuestion/>}/>


            <Route exect path="/*" element={<PageNotFound/>} />
          </Routes>
        </BrowserRouter>
      </UseQuestionContext>
      </UserContext>
    </UseAdminContext>
    </>
  );
}

export default App;

