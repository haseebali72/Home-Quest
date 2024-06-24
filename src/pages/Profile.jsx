import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from "../firebase/firebase"
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { updateProfile } from 'firebase/auth'
import { updateName } from '../firebase/usermodification.firebase'
const Profile = () => {
  const inputRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(true)
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      name: auth?.currentUser?.displayName,
      email: auth?.currentUser?.email
    }
  })
  const { register, watch } = form
  const nameValue = watch('name')
  
  
  const editHandler = () => {
    setIsDisabled(false)
    if(inputRef.current){
      inputRef.current.focus()
    }

  }

  const changeHandler = async () => {
    const data = {
      name : nameValue,
      email : auth.currentUser.email
    }
    
    const response = await updateName(data)
    if(response.userProfileUpdated){
      toast.success(response.userProfileUpdated)
      setIsDisabled(true)
    }
    if(response.errorInCatch){
      toast.error(`E : ${response.errorInCatch}`)
      setIsDisabled(true)
    }
  }

  const signoutHandler = () => {
    auth.signOut()
    navigate("/home")
    toast.success("Signed Out")
  }

  return (
    <>
      <section className='max-w-6xl mx-auto  flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>

        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            <input ref={inputRef} type='text' className={isDisabled ? 'w-full px-4 mt-2 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ' : "w-full px-4 mt-2 py-2 text-xl text-gray-700 bg-white  rounded transition ease-in-out border-blue-900 border-2 "} disabled={isDisabled} {...register("name", {
              required : {
                value : true,
                message : "Name Required"
              }
            })} />

            <input type='email' className='w-full px-4 mt-2 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ' disabled {...register("email")}/>
          </form>

          <div className='flex my-3 mx-0 bg-white justify-between whitespace-nowrap items-center text-sm sm:text-lg'>
            <p className=''>Want to change your name?
              {isDisabled ?
                <button className="text-red-500 ml-1 hover:text-red-600 transition duration-200 ease-in-out" onClick={editHandler}>Edit</button>
                :
                <button className="text-red-500 ml-1 text-sm hover:text-red-600 transition duration-200 ease-in-out" onClick={changeHandler}>Apply Changes</button>
              }
            </p>
            <p>
              <button className="text-blue-400 ml-1 hover:text-blue-600 transition duration-200 ease-in-out" onClick={signoutHandler}>Sign out</button>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile