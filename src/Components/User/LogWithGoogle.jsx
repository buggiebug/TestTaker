import React,{useState,useEffect} from 'react'
import {GoogleLogin,GoogleLogout} from "react-google-login";
import { gapi } from 'gapi-script';

function LogWithGoogle() {

    const [googleLoginState,setGoogleLoginState] = useState(true);
    const [googleLogoutState,setGoogleLogoutState] = useState(false);

    //  //? Client Id...
    const clientId = "556318383783-3ihegu2mcj3utcmc86nd0mf8pt3il0au.apps.googleusercontent.com"

    //  //? Using gapi-script for Google Login, which is Google’s client library for browser-side JavaScript. It is a package that helps us load gapi scripts and initialize functions, and it is used in Google sign-in and other external web pages to easily connect with Google’s APIs.
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: 'email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid'
            });
        };
        gapi.load('client:auth2', initClient);
        // eslint-disable-next-line
    },[]); 

    //  //? On login success...
    const loginSuccess = (res)=>{
        console.log(res.profileObj);
        setGoogleLoginState(false);
        setGoogleLogoutState(true);
    }

    //  //? On login failed...
    const loginFailed = (res)=>{
        console.log(res);
    }
  
    //  //? On logout success...
    const logOutSuccess = ()=>{
        alert("Logout successfully... ");
        setGoogleLoginState(true);
        setGoogleLogoutState(false);
    }
  
  return (
    <div>
        {googleLoginState ? <GoogleLogin
            clientId={clientId}
            buttonText='Google'
            onSuccess={loginSuccess}
            onFailure={loginFailed}
            cookiePolicy={"single_host_origin"}
        ></GoogleLogin> : null
        }
        {/* // //!  If LOGIN in Then Switched to LOGOUT */}
        {
            googleLogoutState ? <GoogleLogout
                clientId={clientId}
                buttonText= 'Logout'
                onLogoutSuccess={logOutSuccess}          
            ></GoogleLogout> : null
        }
    </div>
  );
}

export default LogWithGoogle;