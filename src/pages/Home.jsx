import React, { useEffect, useReducer, useState } from 'react'
import ImageSlider from '../Components/ImageSlider'
import pic1 from "/home1.jpeg"
import pic2 from "/home2.jpg"
import pic3 from "/home3.jpg"
import pic4 from "/home10.jpeg"

import { ColorCircleLoaderFull } from '../Components/Loader'
import { collection,  getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import ListingItem from './ListingItem'

const Home = () => {
  const reducer = (state, action)=>{
    switch (action.type) {
      case 'rent_list':
        return {
          ...state,
          rentList : action.payload.rentList
        }
      case 'offer_list':
        return {
          ...state,
          offerList : action.payload.offerList
        }
      case 'sale_list' : 
      return {
        ...state,
        saleList : action.payload.saleList,
        loading : action.payload.loading
      }
      default:
        break;
    }
  }
  const [state, disptach] = useReducer(reducer, {
      rentList : null,
      offerList : null,
      saleList : null,
      loading : true
    })
  const imageList = [pic3, pic2, pic1, pic4]
  // const [rentlisting, setRentListing] = useState(null)
  // const [salelisting, setSaleListing] = useState(null)
  // const [offerListing, setOfferListing] = useState(null)
  // const [loading, setLoading] = useState(true)

  // UseEffect for Offer Listing
  useEffect(() => {
    async function offerListing() {
      try {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("offer", "==", "Yes"), orderBy("timestamp", "desc"), limit(4))
        const querySnap = await getDocs(q)
        console.log(querySnap.size)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        disptach({type : 'offer_list', payload : {offerList : listings, }})
        // setOfferListing(listings)
        // setLoading(false)
      } catch (error) {
        console.log(error.message)
        toast.error("Error in Catch : Unable to retrieve Offers")
        // setLoading(false)
      }
    }

    offerListing()
  }, [])

  // console.log(state.offer)

  // UseEffect for Rent Listing
  useEffect(() => {
    try {
      async function fetchListing() {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("category", "==", "rent"),orderBy("timestamp", "desc"), limit(5))
        const querySnap = await getDocs(q)
        let listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()

          })
        })
        disptach({type : 'rent_list', payload : {rentList : listings}})
        // setRentListing(listings)
        // setLoading(false)
      }
      fetchListing()

    } catch (error) {
        toast.error("Error in catch : Unable to Retrieve Rent Listing")
        // setLoading(false)
    }

  }, [])
  console.log(state.rentList)

  // Use Effect for Sale Lsiting
  useEffect(() => {
    try {
      async function fetchListing() {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("category", "==", "sale"),orderBy("timestamp", "desc"), limit(5))
        const querySnap = await getDocs(q)
        let listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        disptach({type: 'sale_list', payload : {saleList : listings, loading : false } })
        // setSaleListing(listings)
        // setLoading(false)
      }
      fetchListing()

    } catch (error) {
        toast.error("Error in catch : Unable to Retrieve Sale Listing")
        // setLoading(false)
    }

  }, [])

  if (state.loading) {
    return <ColorCircleLoaderFull />
  }

  return (
    <>
      <div className='h-screen'>
        <div className='bg-gray-100'>
          <ImageSlider
            imageURLs={imageList}
            spaceBetween={2}
            slidePerView={1}
            navigation={true}
            pagination={true}
            scrollbar={true}
            imageStyle={{ width: "88rem", height: "21rem", margin: "auto" }}
            autoPlay={true}
          />

          <div className='max-w-6xl mx-auto pt-4 space-y-6'>
            {state.offerList && state.offerList.length > 0 && (
              <div className='m-2 mb-6 '>
                <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
                <NavLink to="/offers">
                  <p className='px-3 inline text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more Offers </p>
                </NavLink>
                <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>

                  {state.offerList.map((listing) => {
                    return <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                  })}
                </ul>
              </div>
            )}
          </div>

          <hr className='h-1 bg-gray-200 w-[60rem] m-auto '></hr>

          <div className='max-w-6xl mx-auto pt-4 space-y-6'>
            {state.rentList && state.rentList.length > 0 && (
              <div className='m-2 mb-6 '>
                <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for Rent</h2>
                <NavLink to="/category/rent">
                  <p className='px-3 inline text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more Places for Rent</p>
                </NavLink>
                <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>

                  {state.rentList.map((listing) => {
                    return <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                  })}
                </ul>
              </div>
            )}
          </div>

          <hr className='h-1 bg-gray-200 w-[60rem] m-auto '></hr>

          <div className='max-w-6xl mx-auto pt-4 space-y-6'>
            {state.saleList && state.saleList.length > 0 && (
              <div className='m-2 mb-6 '>
                <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for Sale</h2>
                <NavLink to="/category/sale">
                  <p className='px-3 inline text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more Places for Sale</p>
                </NavLink>
                <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>

                  {state.saleList.map((listing) => {
                    return <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                  })}
                </ul>
              </div>
            )}
          </div>


        </div>
      </div>    </>
  )
}

export default Home