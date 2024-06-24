import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { googleAuth } from '../firebase/auth.firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const OAuth = () => {
    const navigate = useNavigate()
    const OAuthHandler = async ()=>{
        const response = await googleAuth()
        if(response?.errorinCatch){
            toast.error(`H : ${response.errorinCatch}`)
        }

        if(response.googleAuthSuccess){
            toast.success(response.googleAuthSuccess)
            navigate("/home")
        }
    }
    return (
        <>
            <button type='submit' onClick={OAuthHandler} className='flex items-center justify-center  w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-150 ease-in-out hover-shadow-lg active:bg-red-800'>
            <FcGoogle className='mr-1 text-lg'/>
                Continue with google
            </button>

        </>
    )
}

export default OAuth