import React,{useContext,useState,useEffect} from 'react';
import {Link,useLocation,useNavigate} from "react-router-dom";

import createUserContext from '../Context/User/createUserContext';
import { toast } from 'react-toastify';

function UserLogin() {

    const location = useLocation();
    const navigate = useNavigate();
    const userToken = "user12Tok34en";
    const userContextData = useContext(createUserContext);
    const { loadingState, loginUser, signupUser } = userContextData;
    
    const [showPasswordErrorState,setShowPasswordErrorState] = useState("hidden");

    const showErorrPass = (e)=>{
      const {target} = e;
      if(String(target.name) === "password" || String(target.name) === "cPassword")
        setShowPasswordErrorState("visible");
      else
        setShowPasswordErrorState("hidden");
    }

    useEffect(() => {
      if (
        location.pathname.startsWith("/login") &&
        localStorage.getItem(userToken)
        )
        navigate("/dashboard",{replace:true});
      // eslint-disable-next-line
    }, []);
    
    
    //  Login State...
    const [userData, setUserData] = useState({ email: "", password: "" });
    const onchange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    };
    const loginSubmit = async(e)=>{
      e.preventDefault();
      const res = await loginUser(userData);
      if(res){
        e.target.reset();
        navigate("/dashboard",{replace:true});
      }
    }


    //  Signup State...
    const [userSignupData, setUserSignupData] = useState({name:"", email: "",phone:"", password: "",cPassword:"" });
    const changeSignupData = (e)=>{
      const { name, value } = e.target;
      setUserSignupData({ ...userSignupData, [name]: value });
    }

    function validate(e){
        e.preventDefault();
        
        var pass=document.getElementById('pass1');
        var upper=document.getElementById('upper');
        var lower=document.getElementById('lower');
        var num=document.getElementById('number');
        var len=document.getElementById('length');
        var sp_char=document.getElementById('special_char');
  
        if(pass.value.match(/[0-9]/)){
          num.style.color='green';
        }
        else{
          num.style.color='red';
        }
  
        if(pass.value.match(/[A-Z]/)){
          upper.style.color='green';
        }
        else{
          upper.style.color='red';
        }
  
        if(pass.value.match(/[a-z]/)){
          lower.style.color='green';
        }
        else{
          lower.style.color='red';
        }
  
        if(pass.value.match(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\?\>\<\.\,]/)){
          sp_char.style.color='green';
        }
        else{
          sp_char.style.color='red';
        }
  
        if(pass.value.length<8){
          len.style.color='red';
        }
        else{
          len.style.color='green';
        }
        if(flag===1) return true;
        else return false;
      }
        var password=document.getElementById("pass1");
        var flag=1;
        function check(ele){
            if(ele.target.value.length >0){
              if(ele.target.value!==password.value){
                document.getElementById('alert').innerText="Confirm password doesn't match."
                flag=0;
              }
              else{
                document.getElementById('alert').innerText="";
                flag=1;
              }
            }
            else{
              document.getElementById('alert').innerText="Please enter confirm password";
              flag=0;
            }
      }

      const signupSubmit = async(e)=>{
        e.preventDefault();
        if(String(userSignupData.password) !== String(userSignupData.cPassword))
        {
          toast.error("Confirm password doesn't match.");
          setShowPasswordErrorState("visible");
          return;
        }
        else{
          const res = await signupUser(userSignupData);
          if(res){
            e.target.reset();
            navigate("/dashboard",{replace:true});
          }
        }
      }
  

  return (
    <>
    <div className='flex justify-center items-center my-10 mx-2'>
      <div className="loginSignup">
          <input type="checkbox" id="check"/>
          <div className="login formDesign">
            <header>
              <div className='flex justify-between'>
                  <Link to="/login" style={location.pathname==="/login"? {color: 'red',textDecoration:"underline"}: {color:'black'}}>Login</Link>
                  <Link to="/admin/_admin">Admin</Link>
              </div>
            </header>
            <form onSubmit={loginSubmit}>
                <input type="text" name='email' onChange={onchange} placeholder="Enter your email"/>
                <input type="password" name='password' onChange={onchange} placeholder="Enter your password"/>
                <button className="btn">
                  {loadingState?<i className="fa-solid fa-spinner animate-spin"></i>
                  :'Login'
                  }
                </button>
            </form>
            <div className="signup">
                <span className="signup">Don't have an account?
                <label htmlFor="check" className='ml-3'>Signup</label>
                </span>
            </div>
          </div>
          {/* //!  Signup...     */}
          <div className="registration formDesign">
              <header className='text-[#009579]'>Signup</header>
              <form id="form" onSubmit={signupSubmit} name="myfrm">
                  <input type="text" name="name" onFocus={showErorrPass} onChange={changeSignupData} id="username" placeholder="Enter your name" autoComplete="off" required/>
                  <input type="email" name="email" onFocus={showErorrPass} onChange={changeSignupData} id="email" placeholder="Enter your email" autoComplete="off" required/>
                  <input type="text" name="phone" onFocus={showErorrPass} onChange={changeSignupData} id="myform_phone" placeholder="Enter your phone number"  pattern="[6-9]\d{9}" title="Please enter a valid number" autoComplete="off" required/>
                  <input type="password" name="password" onFocus={showErorrPass} onChange={changeSignupData} id="pass1" placeholder="Create a password" onKeyUp={validate} autoComplete="off" required />
                  <input type="password" name="cPassword" onFocus={showErorrPass} onChange={changeSignupData} id="pass2" placeholder="Confirm your password" onKeyUp={(e)=>{check(e)}} autoComplete="off" required/>
                  <p id="alert" className='text-red-600'></p>
                  <div className="errors">
                  <ul className={`text-sm ${showPasswordErrorState}`}>
                      <li id="upper">Atleast one uppercase</li>
                      <li id="lower">Atleast one lowercase</li>
                      <li id="special_char">Atleast one special symbol</li>
                      <li id="number">Atleast one number</li>
                      <li id="length">Atleast 8 characters</li>
                  </ul>
                  </div>
                  <button className="btn">
                    {loadingState?<i className="fa-solid fa-spinner animate-spin"></i>
                    :'Signup'
                    }
                  </button>
                  {/* <input type="submit" className="button" value="Signup"/> */}
              </form>
              <div className="signup">
                  <span className="signup">Already have an account?
                  <label htmlFor="check" className='ml-3'>Login</label>
                  </span>
              </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default UserLogin