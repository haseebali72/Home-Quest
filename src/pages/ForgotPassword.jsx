import React, { useState } from 'react'
import Logo from "/Logo.png"
import { NavLink, useNavigate } from 'react-router-dom'
import OAuth from '../Components/OAuth'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
import { resetPassword } from '../firebase/auth.firebase'
import { toast } from 'react-toastify'



const ForgotPassword = () => {
  const navigate = useNavigate()
  const form = useForm()
  const { register, handleSubmit, control, formState: { errors } } = form

  // Fomr Sbmission

  const hs = async (data, event) => {
      const response = await resetPassword(data)
      if(response.passwordResetlink){
        toast.success(response.passwordResetlink)
        navigate("/sign-in")
      }

      if(response.userNotExist){
        toast.error(response.userNotExist)
      }
   }

  return (
    <>
      <section>
        <h1 className='text-3xl text-center mt-6 font-bold'> Forgot Password</h1>
        <div className='flex flex-wrap justify-center items-center px-6 py-122 max-w-6xl mx-auto md:items-center'>
          <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 flex items-center justify-center'>
            <img
              src={Logo}
              className='h-60 w-60'
            />
          </div>

          <div className='w-full sm:w-[30%] sm:ml-2 md:w-[70%] custom-range:w-[67%] lg:w-[40%] lg:ml-5'>
            <form className='my-2' onSubmit={handleSubmit(hs)}>
              <div>
                <input
                  className={errors.email?.message ? 'border-red-600 border-2 w-full px-4 py-2 mb-2 text-xl text-gray-700 bg-whit rounded transition ease-in-out' : 'w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'}
                  type='email'
                  placeholder='Enter you Email'
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Required"
                    }
                  })}
                />
              </div>


              <div className='flex my-3 mx-0 bg-white justify-between whitespace-nowrap items-center text-sm sm:text-lg'>
                <p className=''>Don't have account?
                  <NavLink className="text-red-500 ml-1 hover:text-red-600 transition duration-200 ease-in-out" to="/sign-up">Register</NavLink>
                </p>
                <p>
                  <NavLink className="text-blue-400 ml-1 hover:text-blue-600 transition duration-200 ease-in-out" to="/sign-in">Sign in Instead</NavLink>
                </p>
              </div>
            <input type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover-shadow-lg active:bg-blue-800'/>
            </form>
            
            
            
            <span className='text-center block my-2'>OR</span>
            
            <OAuth />
          
          </div>
        
        </div>

        <DevTool control={control} />

      </section>
    </>
  )
}

export default ForgotPassword