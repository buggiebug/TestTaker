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

  const [statusState, setStatusState] = useState("viewAll");
  const [createNewState, setCreateNewState] = useState(false);
  const [allQuestionState, setAllQuestionState] = useState(true);
  const [viewByCategoryState, setViewByCategoryState] = useState(false);

  const createNew = () => {
    if (!createNewState) {
      setCreateNewState(true);
      setAllQuestionState(false);
      setViewByCategoryState(false);
      setStatusState("createNew");
    }
  };
  const allQuestions = () => {
    if (!allQuestionState) {
      setCreateNewState(false);
      setAllQuestionState(true);
      setViewByCategoryState(false);
      setStatusState("viewAll");
    }
  }
  const viewByCategory = () => {
    if (!viewByCategoryState) {
      setCreateNewState(false);
      setAllQuestionState(false);
      setViewByCategoryState(true);
      setStatusState("viewByCategory");
    }
  };

  return (
    <div className="pt-[220px] md:p-28">
      <div className="mt-10 flex flex-wrap justify-evenly items-center">
        <button
          onClick={createNew}
          className={`${createNewState ? "bg-black text-white" : "bg-white"
            } mb-2 px-3 py-2 rounded-md hover:bg-black hover:text-white`}
        >
          Create New
        </button>
        <button
          onClick={allQuestions}
          className={`${allQuestionState ? "bg-black text-white" : "bg-white"
            } mb-2 px-3 py-2 rounded-md hover:bg-black hover:text-white`}
        >
          All Questions
        </button>
        <button
          onClick={viewByCategory}
          className={`${viewByCategoryState ? "bg-black text-white" : "bg-white"
            } mb-2 px-3 py-2 rounded-md hover:bg-black hover:text-white`}
        >
          Search Question
        </button>
      </div>
      <hr className="my-2" />
      <div className="mt-10">
        {
          createNewState && <div className={`flex justify-center items-center`}>
            <CreateNewQuestion />
          </div>
        }
        {
          allQuestionState && <div className={`flex justify-center items-center`}>
            <AllQuestions props={statusState} />
          </div>
        }
        {
          viewByCategoryState && <div className={`flex justify-center items-center`}>
            <ViewByCategoryQuestions props={statusState} />
          </div>
        }
      </div>
    </div>
  );
}

export default Questions;
