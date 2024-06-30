import React, { useState,useEffect, useContext, useRef } from "react";
import {useNavigate} from "react-router-dom";

import adminContext from "../Context/Admin/createAdminContext";
import Loading from "../Loading";

function TestTaken() {

    const adminToken = "ad1to2ken3";
    const navigate = useNavigate();
  
    const adminContextData = useContext(adminContext);
    const { loadingState, testTakenState, testTakenByUsers,viewTestTakenState,viewTestTakenByUsers } = adminContextData;
  
    const isFetched = useRef(false);
    useEffect(() => {
      if (!localStorage.getItem(adminToken)) navigate("/",{replace:true});
  
      if(!isFetched.current && (!testTakenState || testTakenState?.totalTaken?.length===0)){
        testTakenByUsers();
        isFetched.current = true;
      }
      // eslint-disable-next-line
    }, [testTakenState]);

    const [viewAnswerState,setViewAnswerState] = useState("hidden");
    const [viewAnswerOfUserState,setViewAnswerOfUserState] = useState({mail:"",id:""});
    const closeAnswers = ()=>{
      setViewAnswerState("hidden")
    }
    const viewUserAnswers = async(id,email)=>{
        window.scroll(0,0)
        setViewAnswerState("visible")
        await viewTestTakenByUsers(id);
        setViewAnswerOfUserState({mail:email,id:id})
    }

  return (
    <>
        <div className="pt-[220px] md:pt-24 py-5">
            <div className={`${viewAnswerState} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-[170px] md:mt-0`}>
                <div className="flex justify-end">
                    <p onClick={closeAnswers} className="text-2xl text-white cursor-pointer"><i className="fa-regular fa-circle-xmark"></i></p>
                </div>
                <div className="flex justify-start bg-black p-2">
                    <p className="text-2xl text-white cursor-pointer">{viewAnswerOfUserState.mail}</p>
                </div>
                <div className="w-[95vw] md:w-[50vw] text-white bg-[rgba(0,1,1,0.79)] h-[70vh] overflow-scroll">
                    <Loading state={loadingState}/>
                    {
                        viewTestTakenState.map((e)=>{
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
        <div className="mx-2 md:mx-10">
          <h1 className="text-2xl text-white text-center font-bold my-10">Test Taken By</h1>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-black">
              <thead className="text-xs text-black uppercase bg-gray-100">
                <tr className="text-sm">
                  <th scope="col" className="py-3 px-6">
                    No.
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Subject
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Mail to
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Marks
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Time Taken 
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Test Time
                  </th>
                  <th scope="col" className="py-3 px-6">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {testTakenState.totalTaken.length > 0 ? (
                  testTakenState.totalTaken.map((e,i) => {
                    return (
                      <tr key={e._id} className={`${viewAnswerOfUserState.id===e._id?"bg-gray-600 text-white":"bg-white text-black "}`}>
                        <td className="py-4 px-6">{i+1}</td>
                        <td className="py-4 px-6 font-medium whitespace-nowrap">
                          {e.subjectName}
                        </td>
                        <td className="py-4 px-6">{e.mailTo}</td>
                        <td className="py-4 px-6">{e.marks.gain}/{e.marks.total}</td>
                        <td className="py-4 px-6">{e.timeTaken.timeMin}:{e.timeTaken.timeSec} sec</td>
                        <td className="py-4 px-6">
                          {new Date(e.createdAt).toLocaleString()}
                        </td>
                        <td className="py-4 px-6">
                            <i onClick={()=>{viewUserAnswers(e._id,e.mailTo)}} className="fa fa-eye text-lg hover:text-green-600 cursor-pointer" aria-hidden="true"></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-center text-yellow-200">
                    {loadingState?<td className=""><Loading state={loadingState} /></td>:<td>No data found.</td>}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default TestTaken