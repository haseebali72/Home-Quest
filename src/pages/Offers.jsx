import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { ColorCircleLoader } from '../Components/Loader'
import ListingItem from './ListingItem'

const Offers = () => {
  const [offerListing, setOfferListing] = useState(null)
  const [hasmoreOfferListing, setHasMoreOfferListing] = useState(true)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const elementRef = useRef(null)

  useEffect(() => {
    async function offerListing() {
      try {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("offer", "==", "Yes"), orderBy("timestamp", "desc"))
        const querySnap = await getDocs(q)
        console.log(querySnap.size)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setOfferListing(listings)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        toast.error("Error in Catch : Unable to retrieve Offers")
        // setLoading(false)
      }
    }

    offerListing()
  }, [])

  // function onIntersection (entries){
  //     const firstEntry  = entries[0]
  //     if(firstEntry.isIntersecting && hasmoreOfferListing){
  //        fetchMoreItems() 
  //     }
  // }

  // useEffect(()=>{
  //   const observer = new IntersectionObserver(()=>{
  //     if(observer && elementRef.current){
  //       observer.observe(elementRef.current)
  //     }

  //     return ()=>{
  //       if(observer){
  //         observer.disconnect()
  //       }
  //     }
  //   })
  // }, [offerListing])

  // function fetchMoreItems(){
    
  // }
  
  // console.log(offerListing)
  return (
    <>
    <div className='max-w-6xl mx-auto px-3'>
        <h1 className='text-3xl text-center mt-6 font-bold '> Offers</h1>
        {loading? (<ColorCircleLoader/>) : offerListing && offerListing.length > 0  ? (
          <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {offerListing.map(listing=><ListingItem key={listing.id} id={listing.id} listing={listing.data}/>)}
            </ul>
          </main>
          {<div className='flex justify-center items-center'>

            </div>}
          </>
        ) : (<p>There are no current Offers</p>)
        }
    </div>
    </>
  )
}

export default Offers