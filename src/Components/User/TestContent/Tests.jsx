import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import logo from "../../Images/logo.png";

import questionContext from "../../Context/Questions/createQuestionContext";

function Tests() {
  const questionContextData = useContext(questionContext);
  const { loadingState, subjectNameState, allSubjectsName } = questionContextData;

  useEffect(() => {
    //  Calling function for get subjects name...
    allSubjectsName();
    // eslint-disable-next-line
  },[]);


  return (
    <>
      <div className="pt-10">
        <h3 className="text-center text-2xl font-sans font-bold">
          Test Your Knowledge
        </h3>
        <Loading state={loadingState} />
        <div className="flex flex-wrap justify-evenly my-10">
          {subjectNameState.map((subjectName) => {
            return (
              <div
                key={subjectName}
                className="md:w-[18vw] w-[60vw] sm:w-[18vw] bg-white border rounded-lg shadow-lg my-2"
              >
                <div className="flex justify-center items-center pt-2">
                  <img className="h-[120px] w-[120px]" src={logo} alt="" />
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl capitalize font-bold tracking-tight text-gray-900">
                    {subjectName}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                  <Link
                    to={"/start-test"}
                    state={subjectName}
                    className="float-right px-3 py-2 mb-5 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300"
                  >
                    Start Test
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Tests;
