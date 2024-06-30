import React, { useState } from "react";
import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';

import adminContext from "./createAdminContext";

function UseAdminContext(props) {
  //  //! To connect with the server...
  const url = `${process.env.REACT_APP_URL}`;

  //    //! Admin Token...
  const adminToken = localStorage.getItem("ad1to2ken3");

  //  //! Loading State...
  const [loadingState, setLoadingState] = useState(false);

  //  //! Admin Login...
  const loginAsAdmin = async (userData) => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    const json = await data.json();
    if (json.success === true) {
      localStorage.setItem("ad1to2ken3", json.adminToken);
      toast.success("Logged In :-)");
      setLoadingState(false);
      return true;
    }
    setLoadingState(false);
    toast.error(json.message);
    return false;
  };

  //    //! My Data...
  const [dashboardData1, setDashboardData1] = useState([]);
  const [dashboardData2, setDashboardData2] = useState([]);
  const adminProfile = async () => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/profile`, {
      method: "GET",
      headers: { "content-type": "application/json", adminToken },
    });
    const json = await data.json();
    if (json.success === true) {
      setDashboardData1(json.adminData);
      setDashboardData2(json.adminData.admin);
      setLoadingState(false);
      return true;
    }
    setLoadingState(false);
    return false;
  };

  //    //! Sub-Admins Data...
  const [subAdminState, setSubAdminState] = useState([]);
  const allSubAdmins = async () => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/all-admins`, {
      method: "GET",
      headers: { "content-type": "application/json", adminToken },
    });
    const json = await data.json();
    if (json.success === true) {
      setSubAdminState(json.allAdmins);
      setLoadingState(false);
      return;
    }
    toast.dark(json.message);
    setLoadingState(false);
  };

  //    //! Create New Sub-Admin...
  const createSubAdmin = async (infoGet) => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/new-admin`, {
      method: "POST",
      headers: { "content-type": "application/json", adminToken },
      body: JSON.stringify({ ...infoGet }),
    });
    const json = await data.json();
    if (json.success === true) {
      toast.success("New Admin Created !");
      setLoadingState(false);
      return;
    }
    toast.dark(json.message);
    setLoadingState(false);
  };

  //    //! Update Admin Role...
  const updateAdminRole = async (id, role) => {
    setLoadingState(true);
    if (role === undefined || role === "") {
      toast.info("Role remains");
      setLoadingState(false);
      return;
    }
    const data = await fetch(`${url}/admin/all-admins/update-role/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json", adminToken },
      body: JSON.stringify({ role }),
    });
    const json = await data.json();
    if (json.success === true) {
      toast.info(json.message);
      setLoadingState(false);
      return;
    }
    toast.dark(json.message);
    setLoadingState(false);
  };

  //    //! Delete Sub-Admin...
  const deleteSubAdmin = async (id) => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/all-admins/delete/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json", adminToken },
    });
    const json = await data.json();
    if (json.success === true) {
      toast.warning(json.message);
      setLoadingState(false);
      return;
    }
    toast.dark(json.message);
    setLoadingState(false);
  };

  //    //! All User's Data...
  const [usersDataState, setusersDataState] = useState([]);
  const allUsers = async () => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/all-users`, {
      method: "GET",
      headers: { "content-type": "application/json", adminToken },
    });
    const json = await data.json();
    if (json.success === true) {
      setusersDataState(json.allUsers);
      setLoadingState(false);
      return;
    }
    toast.dark(json.message);
    setLoadingState(false);
  };

  //    //! Delete User...
  const deleteUserProfile = async (id, email) => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/all-users/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json", adminToken },
    });
    const json = await data.json();
    if (json.success === true) {
      toast.info(`User, ${email} Profile Deleted`);
      setLoadingState(false);
      return true;
    }
    toast.warning(json.message);
    setLoadingState(false);
    return false;
  };

  //  //! Test Taken By Users...
  const [testTakenState, setTestTakenState] = useState({
    total: 0,
    totalTaken: [],
  });
  const testTakenByUsers = async () => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/users/testtaken`, {
      method: "GET",
      headers: { "content-type": "application/json", adminToken },
    });
    const json = await data.json();
    if (json.success === true) {
      setTestTakenState({
        total: json.totalTestTakenByUsers,
        totalTaken: json.testTakenByUsers,
      });
      setLoadingState(false);
      return true;
    }
    toast.warning(json.message);
    setLoadingState(false);
    return false;
  };

  const [viewTestTakenState, setViewTestTakenState] = useState([]);
  const viewTestTakenByUsers = async (id) => {
    setLoadingState(true);
    const data = await fetch(`${url}/admin/users/testtaken/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json", adminToken },
    });
    const json = await data.json();
    if (json.success === true) {
      setViewTestTakenState(json.testTakenByUsers);
      setLoadingState(false);
      return true;
    }
    toast.warning(json.message);
    setLoadingState(false);
    return false;
  };

  return (
    <adminContext.Provider
      value={{
        loadingState,
        loginAsAdmin,
        dashboardData1,
        dashboardData2,
        adminProfile,
        subAdminState,
        allSubAdmins,
        createSubAdmin,
        updateAdminRole,
        deleteSubAdmin,
        usersDataState,
        allUsers,
        deleteUserProfile,
        testTakenByUsers,
        testTakenState,
        viewTestTakenByUsers,
        viewTestTakenState,
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
}

export default UseAdminContext;
