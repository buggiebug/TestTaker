import { useState,useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../Loading';
import questionContext from '../../Context/Questions/createQuestionContext';

function UpdateQuestion() {

  const navigate = useNavigate();  

  const questionContextData = useContext(questionContext);
  const {loadingState,updateQuestion} = questionContextData;

  const {state} = useLocation();
  const {questionCategory,questionType,questionName,option_1,option_2,option_3,option_4,right_Answer} = state;

  const [updateState,setUpdateState] = useState({questionCategory,questionType,questionName,option_1,option_2,option_3,option_4,right_Answer});
  const onChange = (e)=>{
    setUpdateState({...updateState,[e.target.name]:e.target.value});
  }
  const updateQuestionSubmit = async(e)=>{
    e.preventDefault();
    await updateQuestion(state._id,updateState);
    await navigate("/admin/_admin/questions");
  }

  return (
    <>
          <div>
          <h3 className='text-2xl text-center font-mono underline'>Update Question</h3>
          <div>
            <Loading state={loadingState}/>
            <div className={`my-10  ${loadingState===true?"hidden":"flex"} flex-wrap justify-center`}>
              <form onSubmit={updateQuestionSubmit}>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="questionCategory">Question Category:</label><br />
                  <input required={true} type="text" value={updateState.questionCategory} onChange={onChange} name='questionCategory' className='md:w-[40vw] w-[80vw] mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="questionType">Question Type:</label><br />
                  <select onChange={onChange} name="questionType" className='p-2 ring-1 rounded-md my-1 outline-none focus:ring-2'>
                    <option value={`${questionType}`}>{String(questionType).charAt(0).toUpperCase() + String(questionType).slice(1,questionType.length)}</option>
                    <option value="easy" >Easy</option>
                    <option value="medium" >Medium</option>
                    <option value="hard" >Hard</option>
                  </select>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="questionName">Question:</label><br />
                  <textarea required={true} type="text" value={updateState.questionName} onChange={onChange} name='questionName' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="option_1">Option 1:</label><br />
                  <textarea required={true} type="text" value={updateState.option_1} onChange={onChange} name='option_1' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="option_2">Option 2:</label><br />
                  <textarea required={true} type="text" value={updateState.option_2} onChange={onChange} name='option_2' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="option_3">Option 3:</label><br />
                  <textarea required={true} type="text" value={updateState.option_3} onChange={onChange} name='option_3' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="option_4">Option 4:</label><br />
                  <textarea required={true} type="text" value={updateState.option_4} onChange={onChange} name='option_4' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="right_Answer">Right Answer:</label><br />
                  <textarea required={true} type="text" value={updateState.right_Answer} onChange={onChange} name='right_Answer' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='text-right mt-5'>
                  <Link to={"/admin/_admin/questions"} className='bg-yellow-200 hover:bg-yellow-500 text-black px-3 py-2 rounded-md ring-yellow-700 focus:ring-2 mr-3'>Cancle</Link>
                  <button className='bg-blue-500 hover:bg-blue-800 text-white px-3 py-2 rounded-md ring-green-900 focus:ring-2' type='submit'>Update</button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </>
  )
}

export default UpdateQuestion;