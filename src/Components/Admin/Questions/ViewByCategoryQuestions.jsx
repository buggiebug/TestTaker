import React,{useContext,useState,useEffect} from 'react'
import questionContext from '../../Context/Questions/createQuestionContext'
import Loading from '../../Loading';

import { useLocation,useNavigate,Link } from 'react-router-dom';
function ViewByCategoryQuestions(props) {

    const adminToken = "ad1to2ken3";
    const location = useLocation();  
    const navigate = useNavigate();  

    const questionContextData = useContext(questionContext);
    const {loadingState,countQuesState,subjectNameState,allSubjectsName,questionState,questionsSearchBySubjectName,deleteQuestion} = questionContextData;

    const [searchNameState,setSearchNameState] = useState({subjectName:"Random"});
    const onChange = (e)=>{
        const {name,value} = e.target;
        setSearchNameState({...searchNameState,[name]:value});
    }

    useEffect(()=>{
        if(!localStorage.getItem(adminToken)){
            navigate("/")
            return;
        }
        allSubjectsName();
        questionsSearchBySubjectName(searchNameState.subjectName)
        // eslint-disable-next-line
    },[location.pathname,props])

    //  //! Search question by subject name...
    const subjectShow = (subj)=>{
        questionsSearchBySubjectName(subj);
        setSearchNameState({subjectName:subj})
    }

    //  //! Search by keyword...
    const searchQuestion = (e)=>{
        e.preventDefault();
        questionsSearchBySubjectName(searchNameState.subjectName)
    }

    //  //! Delete Question by Id...
    const deleteById = async(id)=>{
        await deleteQuestion(id)
        await questionsSearchBySubjectName(searchNameState.subjectName);
    }

  return (
    <>
        <div className='mb-10'>
            <h3 className='text-2xl text-center font-mono'>Seacrh</h3>
            <div className='mt-10'>
                <div>
                    <form onSubmit={searchQuestion} className='flex flex-wrap justify-center items-center'>
                        <input className='mb-1 py-2 px-3 outline-none ring-offset-cyan-400 ring-1 focus:ring-offset-cyan-600 focus:ring-2 rounded-md' onChange={onChange} type="text" name='subjectName' placeholder='Subject' />
                        <button className='mb-1 mx-2 bg-gray-600 hover:bg-gray-900 text-white py-2 px-3 rounded-sm' type='submit'>Search</button>
                    </form>
                </div>
                <div className='mt-3 '>
                    <p className='text-center text-red-800'>suggested !</p>
                    <div className="mt-2 flex flex-wrap justify-center items-center overflow-hidden">
                        {subjectNameState.map((subjectName)=>{    
                            return (<div key={subjectName} onClick={()=>{subjectShow(subjectName)}} className='bg-gray-200 hover:bg-gray-700 hover:text-white px-2 py-1 text-gray-800 rounded-md m-1 cursor-pointer'>
                                {subjectName}
                        </div>)})}
                    </div>
                </div>
                <h3 className='mt-5 text-center'>Showing <span className='text-green-600 underline text-lg'>{searchNameState.subjectName}</span> Questions.</h3>
                <Loading state={loadingState} />
            </div>
            <div className='text-center mt-10'>
                <p>Total Question : {countQuesState}</p>
            </div>
            <div className='flex flex-wrap justify-evenly items-center'>
                {questionState.length > 0 ? questionState.map((e)=>{ 
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
  )
}

export default ViewByCategoryQuestions