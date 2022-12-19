import React, { useState } from "react";
import createQuestionContext from "./createQuestionContext";

import { toast } from 'react-toastify';

function UseQuestionContext(props) {

  //  //! To connect with the server... 
  const url = `${process.env.REACT_APP_URL}`;
  
  const adminToken = localStorage.getItem("ad1to2ken3");

  //  //! Loading State...
  const [loadingState, setLoadingState] = useState(false);

  // //!  Get Question Name...
  const [subjectNameState, setSubjectNameState] = useState([]);
  const allSubjectsName = async () => {
    setLoadingState(true);
    const fetchQuestion = await fetch(`${url}/questions/`, {
      method: "GET",
    });
    const json = await fetchQuestion.json();
    if (json.success === true) {
      let quesName = json.questions.map((e) => {
        return e.questionCategory;
      });
      let storeUnique = new Set(quesName);
      let storeSubjects = [];
      for (let el of storeUnique) storeSubjects.push(el);
      setSubjectNameState(storeSubjects);
    }
    setLoadingState(false);
  };

  // //!  Get Question By subject Name...
  const [questionState, setQuestionState] = useState([]);
  const [countQuesState, setQuesCountState] = useState(0);
  const questionsSearchBySubjectName = async (subject) => {
    setLoadingState(true);
    const fetchQuestion = await fetch(
      `${url}/questions/?questionCategory=${subject}`,
      {
        method: "GET",
      }
    );
    const json = await fetchQuestion.json();
    if (json.success === true) {
      setQuesCountState(json.questionsCount);
      setQuestionState(json.questions);
    }
    setLoadingState(false);
  };

  //  //! View All Questions...
  const [allQuestionState, setAllQuestionState] = useState([]);
  const [toatlQuesState, setTotalQuesState] = useState(0);
  const viewAllQuestionFun = async () => {
    setLoadingState(true);
    const fetchQuestions = await fetch(`${url}/questions`, {
      method: "GET",
    });
    const json = await fetchQuestions.json();
    if(json.success === true){
      setAllQuestionState(json.questions)
      setTotalQuesState(json.questionsCount)
    }
    setLoadingState(false);
  };

  //  //! Create new Question...
  const createNewQuestion = async(quesData)=>{
    setLoadingState(true);
    const uploadData = await fetch(`${url}/admin/questions/new`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        adminToken:adminToken
      },
      body: JSON.stringify({...quesData})
    })
    const json = await uploadData.json();
    if(json.success === true){  
      toast.success("Question Added.")
      setLoadingState(false);
      return;
    }
    toast.info(json.message);
    setLoadingState(false);
  }

  //  //! Delete Question...
  const deleteQuestion = async(id)=>{
    setLoadingState(true);
    const deletedData = await fetch(`${url}/admin/questions/${id}`,{
      method:"DELETE",
      headers:{
        "content-type":"application/json",
        adminToken:adminToken
      }
    })
    const json = await deletedData.json();
    if(json.success === true){
      toast.warning("Question Removed.")
      setLoadingState(false);
      return;
    }
    toast.info(json.message);
    setLoadingState(false);
  }

  //  //! Update Question...
  const updateQuestion = async(id,data)=>{
    setLoadingState(true);
    const updatedData = await fetch(`${url}/admin/questions/${id}`,{
      method:"PUT",
      headers:{
        "content-type":"application/json",
        adminToken:adminToken
      },
      body:JSON.stringify({...data})
    })
    const json = await updatedData.json();
    if(json.success === true){
      toast.info("Question Updated.")
      setLoadingState(false);
      return;
    }
    toast.error(json.message)
    setLoadingState(false);
  }


  return (
    <createQuestionContext.Provider
      value={{
        loadingState,
        subjectNameState,
        allSubjectsName,
        countQuesState,
        questionState,
        questionsSearchBySubjectName,
        viewAllQuestionFun,
        allQuestionState,
        toatlQuesState,
        createNewQuestion,
        deleteQuestion,
        updateQuestion
      }}
    >
      {props.children}
    </createQuestionContext.Provider>
  );
}

export default UseQuestionContext;
