import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import logo from "../../Images/logo.png";

import questionContext from "../../Context/Questions/createQuestionContext";

function Tests() {
  const questionContextData = useContext(questionContext);
  const { loadingState, subjectNameState, allSubjectsName } = questionContextData;

  const hasFetchedData = useRef(false);
  useEffect(() => {
    if (!hasFetchedData.current && (!subjectNameState || subjectNameState?.totalSubjects?.length === 0)) {
      allSubjectsName();
      hasFetchedData.current = true;
    }
  }, [subjectNameState, allSubjectsName]);

  return (
    <>
      <div className="pt-10 text-white">
        <h3 className="text-center text-2xl font-sans font-bold">
          Test Your Knowledge
        </h3>
        <Loading state={loadingState} />
        <div className="flex flex-wrap justify-evenly my-10">
          {subjectNameState?.totalSubjects?.map((subjectName,i) => {
            return (
              <div
                key={subjectName}
                className="md:w-[30vw] w-[80vw] bg-white border rounded-lg shadow-lg my-2"
              >
                <div className="flex justify-center items-center pt-2">
                  <img className="h-[120px] w-[120px]" src={logo} alt="" />
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl capitalize font-bold tracking-tight text-gray-900">
                    {subjectName}
                  </h5>
                </div>
                <div className="flex flex-wrap justify-between mx-5">
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Q. {subjectNameState.countNoOfQuestions[i]}</p>
                  <Link
                    to={"/start-test"}
                    state={subjectName}
                    className="float-right px-3 py-2 mb-5 font-medium text-center text-white bg-[#009579] rounded-lg hover:bg-[#347c6f] focus:ring-2 focus:outline-none focus:ring-blue-300"
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
