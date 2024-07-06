import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { ColorCircleLoader } from '../Components/Loader'
import ListingItem from './ListingItem'
import { useParams } from 'react-router'

const Category = () => {
    const params = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const elementRef = useRef(null)

  useEffect(() => {
    async function listingfetch() {
      try {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("category", "==", params.categoryName), orderBy("timestamp", "desc"))
        const querySnap = await getDocs(q)
        console.log(querySnap.size)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListing(listings)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        toast.error("Error in Catch : Unable to retrieve CAtegory")
        setLoading(false)
      }
    }

    listingfetch()
  }, [])

  return (
    <>
    <div className='max-w-6xl mx-auto px-3'>
        <h1 className='text-3xl text-center mt-6 font-bold '> 
            {params.categoryName == "rent" ? "Places on Rent" : "Places for Sale"}
        </h1>
        {loading? (<ColorCircleLoader/>) : listing && listing.length > 0  ? (
          <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {listing.map(listing=><ListingItem key={listing.id} id={listing.id} listing={listing.data}/>)}
            </ul>
          </main>
          {<div className='flex justify-center items-center'>

            </div>}
          </>
        ) : (<p>There are no current {params.categoryName == "sale" ? "Sale" : "Rent"}</p>)
        }
    </div>
    </>
  )
}

export default Category