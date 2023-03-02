import { useContext, useEffect,useState,useRef } from "react";
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom";

import "./Style_StartTest.css";
import createQuestionContext from "../../Context/Questions/createQuestionContext";
import Instruction from "../Instruction";

function StartTest() {
  const questionContext = useContext(createQuestionContext);
  const { countQuesState, questionState, questionsSearchBySubjectName } = questionContext;

  const location = useLocation();
  const { state } = location;

  const ref = useRef();

  const [userMailState,setUserMailState] = useState("");
  const [validEmailState,setValidMailState] = useState("Invalid Email");
  const changeUserMailValue = (e)=>{
    const userMail = e.target.value;
    if(userMail.includes("@") && userMail.includes(".com")){
      setValidMailState("")
    }else{
      setValidMailState("Invalid Email")
    }
    setUserMailState(userMail);
  }

  useEffect(() => {
    questionsSearchBySubjectName(state);
    // eslint-disable-next-line
  }, []);

  
  const [submitBTNState,setSubmitBTNState] = useState(false);
  //  //! Selected Ans...
  const [selectAnsState,setSelectAnsState] = useState("");
  const selectOption = (e)=>{
    const {value} = e.target;
    setSelectAnsState(value);
  }
  
  //  //! Show START & SUBMIT Buttons...
  const [showStartBTN,setShowStartBTN] = useState("visible");
  const [showSubmitBTN,setShowSubmitBTN] = useState("hidden");

  //  //! Set Questions...
  const [showQuestionState,setShowQuestionState] = useState({id:"",questionNumber:"",questionName:"",option_1:"",option_2:"",option_3:"",option_4:"",right_Answer:""})
  const [indexState,setIndexState] = useState(0)

  const [quesNumber,setQuesNumber] = useState(1);

  const [startTimerState,setStartTimerState] = useState(false);
  //  //! Start Test...
  const startTest = ()=>{
    setShowQuestionState({id:questionState[indexState]._id,questionNumber:quesNumber,questionName:questionState[indexState].questionName,option_1:questionState[indexState].option_1,option_2:questionState[indexState].option_2,option_3:questionState[indexState].option_3,option_4:questionState[indexState].option_4,right_Answer:questionState[indexState].right_Answer})
    setShowStartBTN("hidden");
    setShowSubmitBTN("visible");
    setIndexState(indexState+1);
    setQuesNumber(quesNumber+1);
    setStartTimerState(true);
  }
  //  //! Next Button...
  const nextBtn = () => {
    setSubmitBTNState(false);
    if(indexState!==countQuesState){
      setShowQuestionState({id:questionState[indexState]._id,questionNumber:quesNumber,questionName:questionState[indexState].questionName,option_1:questionState[indexState].option_1,option_2:questionState[indexState].option_2,option_3:questionState[indexState].option_3,option_4:questionState[indexState].option_4,right_Answer:questionState[indexState].right_Answer})
      setIndexState(indexState+1);
    }
    setSelectAnsState("");
  };

  //  //! Previous Button... [ Disabling Previous Button ]
  // const prevBtn = () => {
  //   if(indexState!==1){
  //     setShowQuestionState({id:questionState[indexState-2]._id,,questionNumber:quesNumber,questionName:questionState[indexState-2].questionName,option_1:questionState[indexState-2].option_1,option_2:questionState[indexState-2].option_2,option_3:questionState[indexState-2].option_3,option_4:questionState[indexState-2].option_4,right_Answer:questionState[indexState-2].right_Answer})
  //     setIndexState(indexState-1);
  //   }
  // };
    
  const [timeMinState,setTimeMinState] = useState(0);
  const [timeSecState,setTimeSecState] = useState(0);
  useEffect(() => {
    if(startTimerState){
      if(timeSecState>=59){
        setTimeMinState(timeMinState+1);
        setTimeSecState(0);
      }
      const sec = setInterval(() => {
        setTimeSecState(timeSecState+1);
      },1000);
      return ()=>clearInterval(sec);
    }
    // eslint-disable-next-line
  }, [startTimerState,timeSecState]);



  //  //! Submit Test...
  const [answerState,setAnswerState] = useState({id:"",questionNumber:"",questionName:"",option_1:"",option_2:"",option_3:"",option_4:"",right_Answer:"",yourAnswer:""})
  const [ansState,setAnsState] = useState([]);
  const submitTest = (e)=>{
    setAnswerState({id:e.id,questionNumber:e.questionNumber,questionName:e.questionName,option_1:e.option_1,option_2:e.option_2,option_3:e.option_3,option_4:e.option_4,right_Answer:e.right_Answer,yourAnswer:selectAnsState})
    setSubmitBTNState(true);
    setQuesNumber(quesNumber+1);
    ref.current.click();
  }

  useEffect(()=>{
    if(answerState.yourAnswer !== "" || selectAnsState !== ""){
      setAnsState([...ansState,answerState]);
    }
    // eslint-disable-next-line
  },[answerState])


  return (
    <>
      <div className="mx-3 pt-5 mb-10">
        <h3 className="text-blue-500 font-serif text-center text-4xl">
        {state} Test
        </h3>
        <div className="flex justify-between mt-10 mx-1 md:mx-10">
          <p className="text-xl font-mono">Total Question: <span className="font-semibold">{showStartBTN==="hidden"?countQuesState:""}</span></p>
          <p className="text-lg"><i className="fa-solid fa-hourglass-start mr-2 animate-pulse text-cyan-900"></i> &nbsp;<span className="text-xl">{timeMinState} : {timeSecState}</span><span className="text-sm animate-pulse text-red-500"> sec</span></p>
        </div>
        <div className="container flex justify-center items-center">
          <div className="quesContainer mt-5 my-5">
            {/* //! Show Instructions... */}
            <div className={`${showSubmitBTN === "hidden"?"visible":"hidden"}`}>
              <Instruction/>
              <div className="flex flex-col justify-center items-center">
                <input onChange={changeUserMailValue} value={userMailState} type="email" placeholder="user@mail.com" name="useremail" className="px-2 py-1 rounded-sm focus:ring-2 outline-none text-gray-900"/>
                <p className={`mt-2 text-red-400 ${userMailState.length>0?"block":"hidden"}`}>{validEmailState}</p>
              </div>
            </div>

            {/* //! Show Question... */}
            <div className={`${showSubmitBTN} question pt-2`}>
                  <div className="py-2 font-bold"><span className="">Q {indexState}.</span> <p className="ml-12 -mt-7">{showQuestionState.questionName}</p></div>
                  <div className="pt-3" id="options">
                    <label className="options rounded-md hover:bg-neutral-700 hover:shadow-lg">{showQuestionState.option_1} <input type="radio" onChange={selectOption} checked={selectAnsState===showQuestionState.option_1} value={showQuestionState.option_1} name="radio"/><span className="checkmark"></span> </label> 
                    <label className="options rounded-md hover:bg-neutral-700 hover:shadow-lg">{showQuestionState.option_2} <input type="radio" onChange={selectOption} checked={selectAnsState===showQuestionState.option_2} value={showQuestionState.option_2} name="radio"/><span className="checkmark"></span> </label> 
                    <label className="options rounded-md hover:bg-neutral-700 hover:shadow-lg">{showQuestionState.option_3} <input type="radio" onChange={selectOption} checked={selectAnsState===showQuestionState.option_3} value={showQuestionState.option_3} name="radio"/><span className="checkmark"></span> </label>
                    <label className="options rounded-md hover:bg-neutral-700 hover:shadow-lg">{showQuestionState.option_4} <input type="radio" onChange={selectOption} checked={selectAnsState===showQuestionState.option_4} value={showQuestionState.option_4} name="radio"/><span className="checkmark"></span> </label>
                  </div>
            </div>

            {/* //* Buttons... */}
            <div className="flex flex-wrap justify-between pt-3 text-black">
              
              {/* //! Next Button... */}
              <div className="ml-auto mr-5 mx-3 mb-2">
                <button
                  disabled={showSubmitBTN==="hidden" || indexState >= countQuesState?true:false}
                  onClick={()=>{nextBtn()}}
                  ref={ref}
                  className={`hidden ${showSubmitBTN} ${indexState === countQuesState?"bg-transparent":"bg-blue-300"} px-3 py-2 text-white rounded-sm`}
                >
                  Next <i className="fa-solid fa-forward"></i>
                </button>
              </div>

              {/* //!  Disabling Previous Button... */}
              {/* <div className="ml-auto mr-5 mx-3 mb-2">
                <button disabled={showSubmitBTN==="hidden" || indexState <=1 ?true:false}
                  onClick={()=>{prevBtn()}}
                  className="hidden px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-sm"
                >
                  <i className="fa-solid fa-backward"></i> Previous
                </button>
              </div> */}

              {/* //! Submit, Start & View Score Button... */}
              <div className={`${validEmailState.length===0?"flex":"hidden"} ml-auto mr-5 mx-3 mb-2 flex flex-wrap justify-evenly`}>
                <button disabled={indexState >= 2? true:false} onClick={startTest} className={`${showStartBTN} px-3 py-2 ring-green-900 ring-1 focus:ring-2 bg-green-400 focus:bg-green-600 rounded-sm`}>Start</button>
                <button disabled={submitBTNState} onClick={()=>{submitTest(showQuestionState)}} className={`${showSubmitBTN} ${submitBTNState === true ? "bg-transparent":" text-gray-200 rounded-sm hover:rounded-xl border border-gray-400 hover:bg-green-500 hover:text-white transition-all duration-500"} px-3 py-2 text-white rounded-sm`}>Submit & Next &nbsp;<i className="fa-solid fa-forward"></i></button> 
                <Link to="/your-answer" state={{ansState,subjectName:state,userMailState,timeMinState,timeSecState}} className={`${indexState===countQuesState && submitBTNState ?"visible":"hidden"} mx-2 px-3 py-2 bg-green-400 hover:bg-blue-800 hover:text-white rounded-sm`}>View Score</Link> 
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default StartTest;

