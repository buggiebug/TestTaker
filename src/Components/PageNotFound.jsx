import React from 'react'
import SayNoImage from "./Images/SayNoImage.jpg";

function PageNotFound() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mt-10'>
        <h3 className='font-mono text-3xl text-gray-500'>Page Not Found !</h3>
      </div>
      <div className='mt-10'>
        <img className='md:h-[60vh] w-auto' src={SayNoImage} alt="page-not-found" />
      </div>
    </div>
  )
}

export default PageNotFound