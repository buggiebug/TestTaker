import React,{useState,useContext,useEffect} from 'react'
import questionContext from '../../Context/Questions/createQuestionContext'
import Loading from '../../Loading';
import { useLocation,useNavigate } from 'react-router-dom';

function CreateNewQuestion() {

  const questionContextData = useContext(questionContext);
  const {loadingState,createNewQuestion} = questionContextData;

  const adminToken = "ad1to2ken3";
  const location = useLocation();  
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem(adminToken)){
      navigate("/")
      return;
    }
      // eslint-disable-next-line
  },[location.pathname])


  const [newQuestionState,setNewQuestionState] = useState({questionCategory:"Random",questionName:"",option_1:"",option_2:"",option_3:"",option_4:"",right_Answer:""})
  const onChange = (e)=>{
    const {name,value} = e.target;
    setNewQuestionState({...newQuestionState,[name]:value});
  }

  const uploadQuestion = (e)=>{
    e.preventDefault();
    createNewQuestion(newQuestionState);
    setNewQuestionState({questionCategory:newQuestionState.questionCategory,questionName:"",option_1:"",option_2:"",option_3:"",option_4:"",right_Answer:""})
  }

  return (
    <>
      <div>
          <h3 className='text-2xl text-center font-mono'>Create New</h3>
          <div>
            <Loading state={loadingState}/>
            <div className={`my-10 ${loadingState===true?"hidden":"block"}`}>
              <form onSubmit={uploadQuestion}>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="questionCategory">Question Category:</label><br />
                  <input required={true} type="text" value={newQuestionState.questionCategory} onChange={onChange} name='questionCategory' className='md:w-[40vw] w-[80vw] mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="questionType">Question Type:</label><br />
                  <select onChange={onChange} name="questionType" className='p-2 ring-1 rounded-md my-1 outline-none focus:ring-2'>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="questionName">Question:</label><br />
                  <textarea required={true} type="text" value={newQuestionState.questionName} onChange={onChange} name='questionName' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="option_1">Option 1:</label><br />
                  <textarea required={true} type="text" value={newQuestionState.option_1} onChange={onChange} name='option_1' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="option_2">Option 2:</label><br />
                  <textarea required={true} type="text" value={newQuestionState.option_2} onChange={onChange} name='option_2' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="option_3">Option 3:</label><br />
                  <textarea required={true} type="text" value={newQuestionState.option_3} onChange={onChange} name='option_3' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="option_4">Option 4:</label><br />
                  <textarea required={true} type="text" value={newQuestionState.option_4} onChange={onChange} name='option_4' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='my-1'>
                  <label className='font-semibold font-mono' htmlFor="right_Answer">Right Answer:</label><br />
                  <textarea required={true} type="text" value={newQuestionState.right_Answer} onChange={onChange} name='right_Answer' className='md:w-[40vw] w-[80vw] h-12 mt-1 px-3 py-2 outline-none ring-1 focus:ring-2 rounded-md'/>
                </div>
                <div className='text-right mt-5'>
                  <button className='bg-yellow-200 hover:bg-yellow-500 text-black px-3 py-2 rounded-md ring-yellow-700 focus:ring-2 mr-3' type='reset'>Reset</button>
                  <button className='bg-green-500 hover:bg-green-800 text-white px-3 py-2 rounded-md ring-green-900 focus:ring-2' type='submit'>Add</button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </>
  )
}

export default CreateNewQuestion