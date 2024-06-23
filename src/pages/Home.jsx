import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase/firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  const logoutHandler =async ()=> {
    try {
      const response = await signOut(auth)
      console.log(response)
      toast.success("Successfully signed Out")
      navigate("/sign-in")
    } catch (error) {
       toast.error(`H :${error.message}`)
    }
  }
  return (
    <>
      <button className='bg-blue-600 m-2 p-1 rounded text-white ' onClick={logoutHandler}>Log Out</button>
    </>
  )
}

export default Home