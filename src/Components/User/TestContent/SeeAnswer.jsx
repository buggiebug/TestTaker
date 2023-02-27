import React,{useState,useEffect} from 'react'
import {Link,useLocation} from "react-router-dom";

function SeeAnswer() {
  const {state} = useLocation();
  const {ansState,subjectName,userMailState} = state;
  
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
  
  const sendMail = async(count)=>{
    const fetchData = await fetch(`http://localhost:8080/api/v1/user/send-marks`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({subjectName,userMailState,count,ansState})
    });
    await fetchData.json();
  }
  
  const [countMarkState,setCountMarksState] = useState(0);
  useEffect(()=>{
    //  Add display [none] to each id...
    let count = 1,temp=0;
    ansState.forEach((e)=>{
      if(e.right_Answer === e.yourAnswer){
        setCountMarksState(count)
        count++;
        temp++;
      }
      document.getElementById(e.id).style.display = "none";
    })
    //  Pass the marks...
    sendMail(temp);
    // eslint-disable-next-line
  },[])

  
  return (
    <>
    <div className='pt-10 mx-5'>
        <div>
          <h3 className='font-mono uppercase text-center text-2xl'>Result :)</h3>
          <div className='flex justify-around items-center mt-10'>
            <p className='text-lg text-gray-900'>{subjectName} Test</p>
            <p className='font-serif text-lg'>You Scored : <span className='text-red-800 text-2xl'>{countMarkState}</span></p>
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
              <div>{ansState.length === 0 ? <p className='my-10 text-yellow-700 text-center'>
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

