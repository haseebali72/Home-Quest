import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth, db } from "../firebase/firebase"
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { updateName } from '../firebase/usermodification.firebase'
import { ColorCircleLoader } from "../Components/Loader"
import { NavLink } from 'react-router-dom'
import { FcHome } from "react-icons/fc";
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import ListingItem from './ListingItem'

const Profile = () => {
  const inputRef = useRef(null)
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
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
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const changeHandler = async () => {
    setLoading(true)
    const data = {
      name: nameValue,
      email: auth.currentUser.email
    }

    const response = await updateName(data)
    if (response.userProfileUpdated) {
      toast.success(response.userProfileUpdated)
      setIsDisabled(true)
      setLoading(false)
    }
    if (response.errorInCatch) {
      toast.error(`E : ${response.errorInCatch}`)
      setIsDisabled(true)
      setLoading(false)
    }
  }

  const signoutHandler = async () => {
    await auth.signOut()
    navigate("/home")
    toast.success("Signed Out")
  }
  console.log(auth.currentUser.uid)

  useEffect(() => {

    async function fetchUserListings() {
      setLoading(true)
      const listingRef = collection(db, "listings")
      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc"))
      const querySnap = await getDocs(q)

      const listings = []
      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      // console.log(listings)
      setListings(listings)
      setLoading(false)
      console.log(listings)
    }
    fetchUserListings()
  }, [])

  return (
    <>
      {
        loading ?
          <ColorCircleLoader /> :
          <section className='max-w-6xl mx-auto  flex justify-center items-center flex-col'>
            <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>

            <div className='w-full md:w-[50%] mt-6 px-3'>
              <form>
                <input ref={inputRef} type='text' className={isDisabled ? 'w-full px-4 mt-2 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ' : "w-full px-4 mt-2 py-2 text-xl text-gray-700 bg-white  rounded transition ease-in-out border-blue-900 border-2 "} disabled={isDisabled} {...register("name", {
                  required: {
                    value: true,
                    message: "Name Required"
                  }
                })} />

                <input type='email' className='w-full px-4 mt-2 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ' disabled {...register("email")} />
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

              <div className='flex justify-center items-center w-4/5 mx-auto my-4'>
                <NavLink to="/profile/create-listing" className="flex bg-blue-600 shadow-2xl uppercase text-lg w-4/5 text-center rounded-md p-2 text-white  hover:bg-blue-700 active:scale-95">
                  <FcHome className='text-3xl mx-5 bg-red-200 rounded-full' /> Sell or Rent your Home
                </NavLink>
              </div>
            </div>
          </section>
      }
      <div className='max-w-6xl px-3 mt-6 mx-auto'>
        { 
          !loading && listings.length > 0 && (
            <>
              <h1 className='text-2xl text-center text-red-900 font-semibold'>My Listings</h1>
              <ul>
                {listings.map((listing) => (
                  <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
                ))}
              </ul>
            </>
          )
        }
      </div>
    </>
  )
}

export default Profile
