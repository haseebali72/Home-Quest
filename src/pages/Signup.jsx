import React, { useState } from 'react'
import Logo from "/Logo.png"
import { NavLink } from 'react-router-dom'
import OAuth from '../Components/OAuth'
import { useForm } from 'react-hook-form'
import { AiFillExclamationCircle } from "react-icons/ai";
import { DevTool } from '@hookform/devtools'

const Signup = () => {
  const form = useForm()
  const { register, handleSubmit, control, formState:{errors} } = form

  // Form Submission

  const hs = () => {
    alert("FOtm submit ")
  }

  return (
    <>
      <section>
        <h1 className='text-3xl text-center mt-6 font-bold'> Sign Up</h1>
        <div className='flex flex-wrap justify-center items-center px-6 py-122 max-w-6xl mx-auto'>
          <div className='md:w-[67%] lg:w-[50%] md:flex md:items-center md:justify-center  mb-12 md:mb-6'>
            <img
              src={Logo}
              className='h-60 w-60'
            />
          </div>

          <div className=' w-full md:w-[90%]  lg:w-[40%]'>
            <form className='my-2' onSubmit={handleSubmit(hs)}>
              
              <div className='flex flex-wrap'>
                <input
                  className={errors.name?.message ? 'border-red-600 border-2 w-full px-4 py-2 mb-2 text-xl text-gray-700 bg-whit rounded transition ease-in-out' : 'w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'}
                  type='text'
                  placeholder='Enter you Name'
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name Required"
                    },
                    maxLength: 20,
                    minLength: 3
                  })}
                />
                <button className={errors?.name?.message ? "" : "hidden"}>
                  <AiFillExclamationCircle />
                </button>
              </div>

              <div className='flex flex-wrap'>
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
                <button className={errors?.name?.message ? "" : "hidden"}>
                  <AiFillExclamationCircle />
                </button>
              </div>
              
              <div className='flex flex-wrap'>
                <input
                  className={errors.password?.message ? 'border-red-600 border-2 w-full px-4 py-2 mb-2  text-xl text-gray-700 bg-whit rounded transition ease-in-out' : 'w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'}
                  type='password'
                  placeholder='Enter your Password'
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password required"
                    },
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

                  })}
                />
                <button className={errors?.name?.message ? "" : "hidden"}>
                  <AiFillExclamationCircle />
                </button>
              </div>
              
              <div className='flex flex-wrap'>
                <input
                  className={errors.cpassword?.message ? 'border-red-600 border-2 w-full px-4 py-2 mb-2 text-xl text-gray-700 bg-white rounded transition ease-in-out' : 'w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'}
                  type='password'
                  placeholder='Confirm Password'
                  {...register("cpassword", {
                    required: {
                      value: true,
                      message: "Passoord Required"
                    },
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

                  })}
                />
                <button className={errors?.name?.message ? "" : "hidden"}>
                  <AiFillExclamationCircle />
                </button>
              </div>

              <div className='flex flex-wrap'>
                <input
                  className={errors.mobile_number?.message ? 'border-red-600 border-2 w-full px-4 py-2 mb-2 text-xl text-gray-700 bg-whit rounded transition ease-in-out' : 'w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'}
                  type='tel'
                  placeholder='Mobile Number'
                  {...register("mobile_number", {
                    required: {
                      value: true,
                      message: "Mobile Number Required"
                    }
                  })}
                />
                <button className={errors?.name?.message ? "" : "hidden"}>
                  <AiFillExclamationCircle />
                </button>
              </div>
              
              <input type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover-shadow-lg active:bg-blue-800' />
            </form>

            <span className='text-center block my-2'>OR</span>

            <OAuth />
          </div>
        </div>
        <DevTool control={control}/>

      </section>
    </>
  )
}

export default Signup