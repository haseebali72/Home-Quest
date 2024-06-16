import React, { useState } from 'react'
import Logo from "../../public/Logo.png"

const Signin = () => {
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })
  
  const oninputHandler = (e)=>{
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
  }

  
  console.log(formData)
  return (
    <>
      <section>
        <h1 className='text-3xl text-center mt-6 font-bold'> Signin</h1>
        <div className='flex flex-wrap justify-center items-center px-6 py-122 max-w-6xl mx-auto '>
          <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 bg-red-600'>
            <img
              src={Logo}
              className='h-60 w-60'
            />
          </div>

          <div className='bg-red-800 w-full md:w-[67%] lg:w-[40%] lg:ml-5'>
            <form className='m-2'>
              <input
                onChange={oninputHandler}
                className='w-full'
                name='email'
                type='email'
                placeholder='Enter you Email'
              />
              <input
                className='w-full'
                type='password'
                name='password'
                placeholder='Enter your Password'
                onChange={oninputHandler}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signin