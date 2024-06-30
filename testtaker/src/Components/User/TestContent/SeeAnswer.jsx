import React,{useState,useEffect,useContext} from 'react'
import {Link,useLocation} from "react-router-dom";
import createUserContext from "../../Context/User/createUserContext";
function SeeAnswer() {
  const {state} = useLocation();
  const {ansState,subjectName,userMailState,timeMinState,timeSecState} = state;
  const userContextData = useContext(createUserContext);
  const { saveMyTest } = userContextData;

  //  //! Show the answer...
  const viewAnswerBTN = (id,el)=>{
    ansState.forEach((e)=>{
      if(id === e.id){
        if(document.getElementById(id).style.display === "block")
          document.getElementById(id).style.display = "none";
        else
          document.getElementById(id).style.display = "block";
      }
    })
  }
  
  // const saveMyTest = async(count)=>{
  //   const fetchData = await fetch(`${process.env.REACT_APP_URL}/user/submit-test`,{
  //     method:"POST",
  //     headers:{
  //       "content-type":"application/json"
  //     },
  //     body:JSON.stringify({subjectName,userMailState,count,ansState,timeMinState,timeSecState})
  //   });
  //   await fetchData.json();
  // }
  
  const [countMarkState,setCountMarksState] = useState(0);
  useEffect(()=>{
    //  Add display [none] to each id...
    let count = 1;
    ansState.forEach((e)=>{
      if(e.right_Answer === e.yourAnswer){
        setCountMarksState(count)
        count++;
      }
      document.getElementById(e.id).style.display = "none";
    })
    //  Pass the marks...
    saveMyTest({subjectName,userMailState,count,ansState,timeMinState,timeSecState});
    // eslint-disable-next-line
  },[])

  
  return (
    <>
    <div className='pt-10 mx-5 text-white'>
        <div>
          <h3 className='font-mono uppercase text-center text-2xl'>Result 😉</h3>
          <div className='flex justify-around items-center mt-10'>
            <p className='text-lg '>{subjectName} Test</p>
            <p className='font-serif text-lg'>You Scored : <span className='text-2xl'>{countMarkState}</span></p>
            <p className='font-serif text-lg'>In: <span className='text-2xl'>{timeMinState}:{timeSecState}</span><span className="text-sm animate-pulse"> sec</span></p>
          </div>
        </div>
        <div className='flex flex-wrap justify-center items-center'>
        <div>
              {ansState.map((e)=>{
              return(<div key={e.id} className={`my-10 bg-inherit p-3 rounded-md`}>
                <hr />
                  <p className='my-1 mb-3'>Q {e.questionNumber}.<span className={`ml-3`}>{e.questionName}</span></p>
                  <p className='mb-2'>1.<span className={`ml-3 px-1 rounded-sm`}>{e.option_1}</span></p>
                  <p className='mb-2'>2.<span className={`ml-3 px-1 rounded-sm`}>{e.option_2}</span></p>
                  <p className='mb-2'>3.<span className={`ml-3 px-1 rounded-sm`}>{e.option_3}</span></p>
                  <p className='mb-2'>4.<span className={`ml-3 px-1 rounded-sm`}>{e.option_4}</span></p>
                  <p className='mt-2'>Your Answer<span className={`${e.yourAnswer===e.right_Answer?"bg-green-600":"bg-red-600"} text-white ml-3 px-2 py-1 rounded-md`}>{e.yourAnswer}</span></p>
                  
                  <p onClick={(el)=>{viewAnswerBTN(e.id,el)}} className='mt-3 bg-green-300 text-black inline-block px-1 py-1 rounded-sm cursor-pointer'>View Answer</p>
                  <p id={`${e.id}`} className={`mt-3 bg-yellow-600 text-white px-2 py-1 rounded-sm`}>Right Answer : <span className={`ml-3`}>{e.right_Answer}</span></p>
                  <hr className='mt-1'/>

              </div>)
              })} 
              <div>{ansState.length === 0 ? <p className='my-10 text-white text-center'>
                You didn't select any option.
                <br />
                <Link to="/" className='mt-32 mb-96 block text-blue-500 hover:underline'>Start Again</Link>
              </p>:""}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeeAnswer;

