import React from 'react'
import loader from "./Images/loading.gif";

function Loading(props) {

 const {state} = props;

  return (
    <>
        <div className={`${state===true?"block":"hidden"} flex flex-col justify-center items-center`}>
            <div className='mt-28'>
                <img src={loader} alt="loader" />
            </div>
            <div className='mt-10 text-gray-600'>
              Loading...
            </div>
        </div>
    </>
  )
}

export default Loading;

