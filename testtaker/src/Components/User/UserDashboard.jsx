import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import createUserContext from "../Context/User/createUserContext";

function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const userToken = "user12Tok34en";
  const userContextData = useContext(createUserContext);
  const { loadingState, userProfile, userProfileDataState, getAllTest, getAlltestState } = userContextData;

  useEffect(() => {
    if (
      location.pathname.startsWith("/dashboard") &&
      !localStorage.getItem(userToken)
    ){
      navigate("/", { replace: true });
    }else
      userProfile();
    // eslint-disable-next-line
  }, []);

  const showMyTest = async()=>{
    getAllTest();
  }

  const [testSate,setTestState] = useState([]);
  const [viewAnswerState,setViewAnswerState] = useState("hidden");
  const viewSingleTest =  (answers)=>{
    window.scroll(0,0)
    setTestState(answers);
    setViewAnswerState("visible")
  }
  const closeAnswers = ()=>{
    setViewAnswerState("hidden")
  }

  return (
    <>
      <div className="mx-1 flex flex-wrap justify-center md:justify-between items-center md:mx-10 my-10 text-white rounded-md">
        <div className="shadow-md p-10 text-gray-200">
          <p className="font-medium text-lg mb-5">My Profile :</p>
          <p>
            {userProfileDataState.name}
          </p>
          <p>
            {userProfileDataState.email}
          </p>
          <p>
            {userProfileDataState.phone}
          </p>
        </div>
        <div className="flex justify-center items-center mx-2 md:mt-0 mt-10">
          <button onClick={()=>{showMyTest()}} className="btn hover:border-black hover:text-black">Load Test</button>
        </div>
      </div>
      <hr />
      <div className="mx-1 flex flex-wrap justify-center items-center md:mx-10 my-10 text-white">
        <div className="overflow-x-scroll mx-2 md:mx-10">
              <table className="w-full text-sm text-left text-black">
                <thead className="text-xs uppercase bg-yellow-300">
                  <tr className="text-base">
                    <th scope="col" className="py-3 px-6">
                      Subject
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Result Mailed to
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Marks
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Time Taken
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Date
                    </th>
                    <th scope="col" className="py-3 px-6">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {getAlltestState.length > 0 ? 
                  getAlltestState.map((e)=>{
                    return (<tr key={e._id} className="bg-white rounded-md">
                      <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                        {e.subjectName}
                      </th>
                      <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                        {e.mailTo}
                      </th>
                      <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                        {e.marks.gain}/{e.marks.total}
                      </th>
                      <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                        {e.timeTaken.timeMin} : {e.timeTaken.timeSec} sec
                      </th>
                      <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
                        {new Date(e.createdAt).toLocaleString()}
                      </th>
                      <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap text-center">
                        <button onClick={()=>{viewSingleTest(e.answers)}} className="cursor-pointer text-lg hover:text-green-600 outline-none"><i className="fa-regular fa-eye"></i></button>
                      </th>
                    </tr>)
                  })
                  : (
                  <tr className="text-center text-white">
                    <td>{loadingState?"Loading...":"No data found."}</td>
                  </tr>
                  )}
                </tbody>
              </table>
        </div>
      </div>
      <div className={`${viewAnswerState} ${testSate.length<=0?"hidden":"visible"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-[50px] md:mt-0`}>
          <div className="flex justify-end">
            <p onClick={closeAnswers} className="text-2xl text-white cursor-pointer"><i className="fa-regular fa-circle-xmark"></i></p>
          </div>
          <div className="w-[95vw] md:w-[50vw] text-white bg-[rgba(0,1,1,0.79)] h-[70vh] overflow-scroll">
              {
                testSate.map((e)=>{
                  return (
                    <div key={e._id} className={`my-10 bg-inherit p-3 rounded-md`}>
                      <hr />
                        <p className='my-1 mb-3'>Q {e.questionNumber}.<span className={`ml-3`}>{e.questionName}</span></p>
                        <p className='mb-2'>1.<span className={`ml-3 px-1 rounded-sm`}>{e.option_1}</span></p>
                        <p className='mb-2'>2.<span className={`ml-3 px-1 rounded-sm`}>{e.option_2}</span></p>
                        <p className='mb-2'>3.<span className={`ml-3 px-1 rounded-sm`}>{e.option_3}</span></p>
                        <p className='mb-2'>4.<span className={`ml-3 px-1 rounded-sm`}>{e.option_4}</span></p>
                        <p className='mt-2'>Your Answer<span className={`${e.yourAnswer===e.right_Answer?"bg-green-600":"bg-red-600"} text-white ml-3 px-2 py-1 rounded-md`}>{e.yourAnswer}</span></p>
                        
                        <p className={`mt-3 bg-yellow-600 text-white px-2 py-1 rounded-sm`}>Right Answer : <span className={`ml-3`}>{e.right_Answer}</span></p>
                        {/* <hr className='mt-1'/> */}
                    </div>
                  )
                })
              }
            

          </div>
      </div>
    </>
  );
}

export default UserDashboard;
