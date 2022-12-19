import React from 'react'
// import LogWithGoogle from './LogWithGoogle'

const loginSubmit = (e)=>{
  e.preventDefault();
  alert("Comming Soon...")
}

function Login() {
  return (
    <>
      <div className='pt-10 flex justify-center items-center'>
        <div className='ring-1 ring-green-500 py-5 px-3 rounded-md shadow-lg'>
        <div className='text-center'>
          <h3 className='text-xl text-green-500 uppercase underline font-serif font-medium'>Login</h3>
        </div>
        <div className='flex flex-wrap justify-center items-center'>
            <div className='pt-5'>
              <form onClick={loginSubmit}>
                <div className='mb-2'>
                  <label htmlFor="email">Email</label> <br />
                  <input className='ring-1 ring-green-600 focus:ring-blue-600 rounded-sm outline-none px-2 py-1' type="email" name="email" />
                </div>
                <div className='mb-2'>
                  <label htmlFor="password">Password</label> <br />
                  <input className='ring-1 ring-green-600 focus:ring-blue-600 rounded-sm outline-none px-2 py-1' type="text" name='password' />
                </div>
                <div className='mt-2 text-right'>
                  <input className='bg-green-500 px-3 py-2 rounded-md text-white focus:ring-1 ring-green-800 cursor-pointer' type="submit" value={"Login"}/>
                </div>
              </form>
            </div>
        </div>
        {/* <div className='mt-10 mx-5'>
          <div className='text-center'>OR</div>
          <div className='text-center mt-10'>GOOGLE</div>
        </div> */}
        </div>
      </div>
    </>
  )
}

export default Login