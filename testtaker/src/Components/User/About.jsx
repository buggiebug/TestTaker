import React from 'react'

function About() {
  return (
    <>
      <div className='mx-5 ml-8 pt-10 text-white'>
        <div className='flex flex-wrap justify-center items-center'>
          <ol className='list-disc'>
            <h3 className='mb-5 font-semibold font-mono text-xl'>TestTaker</h3>
            <li>Here you can solve the MCQ Problems.</li>
            <li>There are many topics & subjects MCQ available.</li>
            <li>The solution of the questions will be mailed to your Email.</li>
            <li>You can practive here by selecting your favorite topics.</li>
          </ol>
        </div>
        <div className='mt-12 grid place-items-center'>
          <a className='text-lg font-mono text-gray-300' href="https://shubham-buggie.netlify.app/" target="_blank" rel="noopener noreferrer">😎 <span className='hover:underline'>Developer Details</span> 😎</a>
        </div>
      </div>
    </>
  )
}

export default About