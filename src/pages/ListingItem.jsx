import React from 'react'
// import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";
import {FaTrash} from "react-icons/fa"
import { MdEdit } from 'react-icons/md';
import { priceConverter } from '../utils/priceConverter';
import { auth } from '../firebase/firebase';

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  const timestamp = new Date(listing.timestamp.seconds * 1000);
  return (
    <>
      <li className='bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px] '>
        <NavLink to={`/category/${listing.category}/${id}`} className="contents">
          <img src={listing.imageURLs[0]} alt='ghar' className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in ' loading='lazy'/>
          {/* <Moment className= "absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"format='undefined'>{timestamp}</Moment>         */}
          <div className=" w-full p-[10px] ">
            <div className=" flex items-center space-x-1 ">
                <MdLocationOn className='h-4 w-4 text-green-600 '/>
                <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>{listing.address}</p>
            </div>
            <p className='font-semibold m-0 text-xl  '>{listing.name}</p>
            <p className='text-[#457b9d] mt-2 font-semibold '>
              {`${priceConverter(listing.price)} ${listing.currency}`}
              {listing.category == "rent"? "/month" : null}
             </p>
             <div className='flex  items-center mt-[10px] space-x-3 '>
                <div className='flex items-center space-x-1'>
                  <p className='font-bold text-xs '>
                    {listing.beds > 1 ? `${listing.beds} Beds` : "1 Bed"} 
                  </p>
                </div>
                
                <div className='flex items-center space-x-1'>
                  <p className='font-bold text-xs '>
                    {listing.bath > 1 ? `${listing.bath} Bathrooms`: "1 Bath"}
                  </p>
                </div>
             </div>
          </div>
        </NavLink>
        <div className='inline-flex cursor '>
        {onDelete && (
          <FaTrash
            // className='h-[14px] bottom absolute cursor-pointer text-red-500 '
            className='mr-1 cursor-pointer'
            onClick={()=>onDelete(listing.id)}
          />
        )}
        {onEdit && (
          <MdEdit
            // className='bottom-2 absolute right-7 h-4 cursor-pointer text-black'
            className='cursor-pointer'
            onClick={()=>onEdit(listing.id)}
          />
        )}
        </div>
       
      </li>
    </>
  )
}


export default ListingItem