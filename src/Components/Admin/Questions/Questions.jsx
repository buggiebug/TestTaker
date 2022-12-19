import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CreateNewQuestion from "./CreateNewQuestion";
import AllQuestions from "./AllQuestions";
import ViewByCategoryQuestions from "./ViewByCategoryQuestions";

function Questions() {
  const adminToken = "ad1to2ken3";
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(adminToken)) {
      navigate("/");
      return;
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const [statusState,setStatusState] = useState("viewAll");
  const [createNewState, setCreateNewState] = useState("hidden");
  const [allQuestionState, setAllQuestionState] = useState("visible");
  const [viewByCategoryState, setViewByCategoryState] = useState("hidden");

  const createNew = () => {
    if (createNewState === "hidden") {
      setCreateNewState("visible");
      setAllQuestionState("hidden");
      setViewByCategoryState("hidden");
      setStatusState("createNew");
    }
  };
  const allQuestions = ()=>{
    if(allQuestionState==="hidden"){
      setAllQuestionState("visible");
      setCreateNewState("hidden");
      setViewByCategoryState("hidden");
      setStatusState("viewAll");
    }
  }
  const viewByCategory = () => {
    if (viewByCategoryState === "hidden") {
      setViewByCategoryState("visible");
      setAllQuestionState("hidden");
      setCreateNewState("hidden");
      setStatusState("viewByCategory");
    }
  };

  return (
    <div>
      <div className="mt-10 flex flex-wrap justify-evenly items-center">
        <button
          onClick={createNew}
          className={`${
            createNewState === "visible" ? "bg-gray-900" : "bg-gray-600"
          } mb-1 px-3 py-2 rounded-md text-white hover:bg-gray-700`}
        >
          Create New
        </button>
        <button
          onClick={allQuestions}
          className={`${
            allQuestionState === "visible" ? "bg-gray-900" : "bg-gray-600"
          } mb-1 px-3 py-2 rounded-md text-white hover:bg-gray-700`}
        >
          All Questions
        </button>
        <button
          onClick={viewByCategory}
          className={`${
            viewByCategoryState === "visible" ? "bg-gray-900" : "bg-gray-600"
          } mb-1 px-3 py-2 rounded-md text-white hover:bg-gray-700`}
        >
          Search Question
        </button>
      </div>
      <hr className="my-2" />
      <div className="mt-10">
        <div className={`${createNewState} flex justify-center items-center`}>
          <CreateNewQuestion/>
        </div>
        <div className={`${allQuestionState} flex justify-center items-center`}>
          <AllQuestions props={statusState}/>
        </div>
        <div
          className={`${viewByCategoryState} flex justify-center items-center`}
        >
          <ViewByCategoryQuestions props={statusState}/>
        </div>
      </div>
    </div>
  );
}

export default Questions;
