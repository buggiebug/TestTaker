import React from 'react'
import loader from "./Images/loading.gif";

function Loading(props) {

 const {state} = props;

  return (
    <>
        <div className={`${state===true?"block":"hidden"} flex flex-col justify-center items-center`}>
            <div className='mt-8'>
                <img src={loader} alt="loader" />
            </div>
            <div className='mt-5 text-white'>
              Loading...
            </div>
        </div>
    </>
  )
}

export default Loading;

