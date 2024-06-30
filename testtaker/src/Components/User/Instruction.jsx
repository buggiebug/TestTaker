import React from 'react'

function Instruction() {
  return (
    <>
        <div className='ml-3'>
            <ol className='list-decimal'>
                <li className='mb-2'>To start test click on START Button.</li>
                <li className='mb-2'>You sholud select an option before submit the answer.</li>
                <li className='mb-2'>Once you SUBMIT the answer, then you are not able to change it.</li>
                <li className='mb-2'>If you are not selecting any option then, that question is not considered.</li>
                <li className='mb-2'>Each question contain 1 point for right answer.</li>
                <li className='mb-2'>You will see the correct answer only after solving all the questions.</li>
                <li className='mb-2 text-green-400'>Enter your email address to get the answer on your mail.</li>
            </ol>
        </div>
    </>
  )
}

export default Instruction