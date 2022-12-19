import React,{useContext,useEffect} from "react";

import questionContext from "../../Context/Questions/createQuestionContext";
import Loading from "../../Loading";

import { useNavigate, Link } from "react-router-dom";

function AllQuestions(props) {
    const adminToken = "ad1to2ken3";
    const navigate = useNavigate();

    const questionContextData = useContext(questionContext);
    const {
        loadingState,
        toatlQuesState,
        allQuestionState,
        viewAllQuestionFun,
        deleteQuestion
    } = questionContextData;

    useEffect(()=>{
        if(!localStorage.getItem(adminToken)) navigate("/")
        viewAllQuestionFun();
        // eslint-disable-next-line 
    },[props])

    //  //! Delete Question by Id...
    const deleteById = async(id)=>{
        await deleteQuestion(id)
        await viewAllQuestionFun();
    }

  return (
    <>
      <div className="mb-10">
        <h3 className="text-2xl text-center font-mono mb-10">Total Questions : {toatlQuesState}</h3>
        <Loading state={loadingState}/>
        <div className='flex flex-wrap justify-evenly items-center'>
            {allQuestionState.length > 0 ? allQuestionState.map((e)=>{ 
            return (<div key={e._id} className="mx-10 mt-10 border shadow-lg p-3 rounded-md">
                <div className='my-2 text-lg'><span className='mr-2 font-semibold'>Question.</span> <p className='py-2'>{e.questionName}</p></div>
                <p className='my-3'><span className='mr-2 font-semibold'>1.</span>{e.option_1}</p>
                <p className='my-3'><span className='mr-2 font-semibold'>2.</span>{e.option_2}</p>
                <p className='my-3'><span className='mr-2 font-semibold'>3.</span>{e.option_3}</p>
                <p className='my-3'><span className='mr-2 font-semibold'>4.</span>{e.option_4}</p>
                <p className='my-3 bg-green-500 p-1 rounded-sm text-white'><span className='mr-2 font-semibold text-black'>Rignt Answer. </span>{e.right_Answer}</p>
                <div className='flex justify-between text-gray-500 my-2'>
                    <p className=''>{e.questionCategory}</p>
                    <p className=''>{e.questionType}</p>
                </div>
                <div className='flex justify-around items-center'>
                    <button onClick={()=>{deleteById(e._id)}} className='text-blue-500 hover:text-red-500'><i className="fa-solid fa-trash"></i></button>
                    <Link to={`/admin/_admin/question-update`} state={e} className='text-blue-500 hover:text-green-500'><i className="fa-solid fa-pen-to-square"></i></Link>
                </div>
            </div>)
            }):<p className='text-center text-red-500 text-lg mt-10'>No questions found :)</p>}
        </div>
      </div>
    </>
  );
}

export default AllQuestions;
