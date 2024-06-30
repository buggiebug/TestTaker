import React, { useState } from "react";
import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';

import CreateUserContext from "./createUserContext";
function UserContext(props) {
  //  //! To connect with the server...
  const url = `${process.env.REACT_APP_URL}`;
  //    //! User Token...
  const userToken = localStorage.getItem("user12Tok34en");
  //  //! Loading State...
  const [loadingState, setLoadingState] = useState(false);
  const [userProfileDataState, setUserProfileDataState] = useState([]);
  const [getAlltestState, setGetAllTestState] = useState([]);

  //  //! User Login...
  const loginUser = async (userData) => {
    setLoadingState(true);
    const data = await fetch(`${url}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    const json = await data.json();
    if (json.success === true) {
      localStorage.setItem("user12Tok34en", json.userToken);
      toast.success("Logged in.");
      setLoadingState(false);
      return true;
    }
    setLoadingState(false);
    toast.error(json.message);
    return false;
  };

  //  //! User Signup...
  const signupUser = async (userData) => {
    setLoadingState(true);
    const data = await fetch(`${url}/new-user`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    const json = await data.json();
    if (json.success === true) {
      localStorage.setItem("user12Tok34en", json.userToken);
      toast.success("Account created.");
      setLoadingState(false);
      return true;
    }
    setLoadingState(false);
    toast.error(json.message);
    return false;
  };

  //  //! My Profile...
  const userProfile = async () => {
    setLoadingState(true);
    const data = await fetch(`${url}/user/me`, {
      method: "GET",
      headers: { "content-type": "application/json", userToken },
    });
    const json = await data.json();
    if (json.success === true) {
      setUserProfileDataState(json.user);
      setLoadingState(false);
      return true;
    }
    setLoadingState(false);
    toast.error(json.message);
    return false;
  };

  //  //! Save Test and send mail...
  const saveMyTest = async({subjectName,userMailState,ansState,timeMinState,timeSecState})=>{
    const fetchData = await fetch(`${process.env.REACT_APP_URL}/user/submit-test`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({subjectName,userMailState,ansState,timeMinState,timeSecState})
    });
    const json = await fetchData.json();
    if (json.success === true) {
      toast.info(json.message);
      return true;
    }
    setLoadingState(false);
    toast.error(json.message);
    return false;
  }

  //  //! Get All Test...
  const getAllTest = async () => {
    setLoadingState(true);
    const data = await fetch(`${url}/user/get-all-test`, {
      method: "GET",
      headers: { "content-type": "application/json", userToken },
    });
    const json = await data.json();
    if (json.success === true) {
      setGetAllTestState(json.allTests);
      setLoadingState(false);
      return true;
    }
    setLoadingState(false);
    toast.error(json.message);
    return false;
  };

  return (
    <CreateUserContext.Provider
      value={{
        loadingState,
        loginUser,
        signupUser,
        userProfile,
        userProfileDataState,
        saveMyTest,
        getAllTest,
        getAlltestState,
      }}
    >
      {props.children}
    </CreateUserContext.Provider>
  );
}

export default UserContext;
