import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase/firebase'
import ImageSlider from '../Components/ImageSlider';
import { ColorCircleLoaderFull } from '../Components/Loader';

import { CiShare2 } from "react-icons/ci";
import { toast } from 'react-toastify';

const Listing = () => {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchList() {
            console.log(params.listingId)
            const docRef = doc(db, "listings", params.listingId)
            const docSnap = await getDoc(docRef)
            console.log(docSnap.exists())
            if (docSnap.exists()) {
                const data = docSnap.data()
                setListing(data)
                setLoading(false)
            }
        }
        fetchList();
    }, [])

    console.log(listing)

    return (
        <>
            {loading ? <ColorCircleLoaderFull /> :
                <>
                    <div className='w-[600px] h-80 m-10'>
                        <ImageSlider imageURLs={listing.imageURLs} />
                    </div>
                    <div
                        onClick={() => {
                            navigator.clipboard.writeText(location.href)
                            toast.info('🦄 Link Copied!', {
                                position: "bottom-right",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                });
                        }}
                        className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center'
                    >
                        <CiShare2 className='text-lg text-slate-500' />
                    </div>
                </>}

        </>

    )
}

export default Listing


// import React, { useState } from 'react';
// import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

// const ImageSlider = ({ imageURLs }) => {
//   const [index, setIndex] = useState(0);

//   const showPreviousImage = () => {
//     setIndex(index => {
//       if (index === 0) {
//         return imageURLs.length - 1;
//       } else {
//         return index - 1;
//       }
//     });
//   };

//   const showNextImage = () => {
//     setIndex(index => {
//       if (index === imageURLs.length - 1) {
//         return 0;
//       } else {
//         return index + 1;
//       }
//     });
//   };

//   return (
//     <div className='w-full h-full relative'>
//       <img src={imageURLs[index]} className='' alt='slide' />
//       <button
//         onClick={showPreviousImage}
//         className='block absolute top-0 bottom-0 left-0 p-4 cursor-pointer transition-colors duration-100 ease-in-out hover:bg-black'
//         style={{ all: 'unset' }}
//       >
//         <FaArrowLeftLong className='stroke-white fill-black h-8 w-8' />
//       </button>
//       <button
//         onClick={showNextImage}
//         className='block absolute top-0 bottom-0 right-0 p-4 cursor-pointer'
//       >
//         <FaArrowRightLong className='stroke-white fill-black h-8 w-8' />
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;
