import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { auth, db } from '../firebase/firebase'
import ImageSlider from '../Components/ImageSlider';
import { ColorCircleLoaderFull } from '../Components/Loader';
import { FaPrint, FaBed, FaCalculator, FaWhatsapp, FaCheckCircle, FaWifi } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { FiShare2 } from "react-icons/fi";
import { LuSofa } from "react-icons/lu";
import { PiElevatorBold } from "react-icons/pi";
import { GoXCircleFill } from "react-icons/go";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";
import { RiSofaFill } from "react-icons/ri";
import { FaKitchenSet } from "react-icons/fa6";
import { GrLounge } from "react-icons/gr";
import { GiMirrorMirror } from "react-icons/gi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faHandsHoldingChild, faHospital, faMosque, faPenToSquare, faPersonSwimming, faRecycle, faSchool, faTv } from '@fortawesome/free-solid-svg-icons';

import { priceConverter } from '../utils/priceConverter';
const Listing = () => {
    const navigate = useNavigate()
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

    // console.log(listing)

    return (
        <>
            {loading ? <ColorCircleLoaderFull /> :
                <>
                    <main>
                        <div className=''>
                            <div className='flex'>
                                {/* Name and Address */}
                                <div className='w-5/6 h-auto my-2 mr-2'>
                                    <h1 className='text-lg leading-4 mx-4 my-2 font-sans font-bold text-slate-600'>{listing.name}</h1>
                                    <h1 className='text-md mx-4 my-2 font-sans  text-slate-600'>{listing.address}</h1>
                                </div>

                                {/* Print, share and Edit    */}
                                <div className='w-2/5 h-[70px] my-2 flex  items-center' >
                                    <button className='flex justify-center items-center mx-2 my-1 py-1 w-32 text-green-700 text-sm border-green-200  border-[1px] rounded-md hover:bg-green-700 hover:text-white transition-all ease-out'>
                                        <FaCalculator className='m-1' />
                                        Home Loan
                                    </button>

                                    <button className='flex justify-center items-center mx-2 my-1 py-2 w-8 h-8 text-white border-green-700 border-[1px] bg-green-700 rounded-full hover:text-green-700 hover:bg-white transition-all ease-out '>
                                        <FiShare2 className='text-xl ' />
                                    </button>

                                    <button className='flex justify-center items-center mx-2 my-1 py-1 w-8 h-8 text-white border-green-700 border-[1px] bg-green-700 rounded-full hover:text-green-700 hover:bg-white transition-all ease-out'>
                                        <FaPrint className='text-lg' />
                                    </button>
                                    {auth.currentUser && <button onClick={() => navigate(`/edit-listing/${params.listingId}`)} className='flex justify-center items-center mx-2 my-1 py-1 w-8 h-8 text-white border-green-700 border-[1px] bg-green-700 rounded-full hover:text-green-700 hover:bg-white transition-all ease-out'>
                                        <FontAwesomeIcon icon={faPenToSquare} className='text-lg' />
                                    </button>}

                                </div>
                                <hr />

                            </div>

                            {/* Sliider + Contact Div */}
                            <div className='flex'>
                                {/* Slider */}
                                <div className='w-[48rem]  ml-4'>
                                    <ImageSlider
                                        imageURLs={listing.imageURLs}
                                        spaceBetween={2}
                                        slidePerView={1}
                                        navigation={true}
                                        pagination={true}
                                        scrollbar={true}
                                        imageStyle={{width : "24rem", height : "35rem", margin : "auto"}}
                                    />
                                </div>

                                {/* Contact Div */}
                                <div className=' w-96 ml-32 rounded-lg shadow-2xl h-[35rem]'>
                                    <h1 className='text-2xl m-4'>{listing.currency} {priceConverter(listing.price)}</h1>

                                    <div className='w-full'>
                                        <div className='m-2 flex justify-center items-center'>
                                            <button className='flex items-center justify-center bg-white mx-2 w-3/5 h-14 rounded-md text-2xl text-green-700 font-bold border-green-700 border-[2px]'>
                                                <FaWhatsapp className='mr-2' />WhatsApp
                                            </button>
                                            <button className='flex items-center justify-center bg-2e9132 mx-2 w-2/5 h-14 rounded-md text-2xl font-bold text-white'>
                                                <IoCall className='mr-2' />Call
                                            </button>
                                        </div>
                                        <div className='m-2'>
                                            <input className='mx-2 auto mt-2 w-11/12 bg-slate-100 border-slate-400 rounded-sm h-[52px]' placeholder='Name'></input>
                                            <input className='mx-2 auto mt-2 w-11/12 bg-slate-100 border-slate-400 rounded-sm h-[52px]' placeholder='Email'></input>
                                            <input className='mx-2 auto mt-2 w-11/12 bg-slate-100 border-slate-400 rounded-sm h-[52px]' placeholder='Phone'></input>
                                            <textarea className='mx-2 auto mt-2 w-11/12 bg-slate-100 border-slate-400 rounded-sm h-16' placeholder='Message' ></textarea>

                                            <div className='flex flex-col m-2 '>
                                                <div><p className='mr-4'>I am a:</p></div>
                                                <div>
                                                    <input type="radio" className="text-green-400" id="buyer" name="Buyer/Tenant" value="Buyer/Tenant" />
                                                    <label htmlFor="buyer" className='mr-4 ml-1 text-slate-500'>Buyer/Tenant</label>
                                                    <input type="radio" className="text-green-400" id="agent" name="Agent" value="Agent" />
                                                    <label htmlFor="agent" className='mr-4 ml-1 text-slate-500'>Agent</label>
                                                    <input type="radio" className="text-green-400" id="other" name="Other" value="Other" />
                                                    <label htmlFor="other" className='ml-1 text-slate-500'>Other</label><br></br>
                                                </div>
                                            </div>
                                            <div className='flex items-center mx-2'>
                                                <input type="checkbox" id="vehicle1" name="info_send?" value="Bike" className='mr-2' />
                                                <label htmlFor="vehicle1" className='text-sm '> Keep me informed about similar properties.</label><br />
                                            </div>

                                            <input type='submit' value="SEND EMAIL" className='w-full h-16 mx-1 my-3 px-3 py-2 font-bold text-green-700  border-green-700 border-2 cursor-pointer rounded-md hover:bg-green-700 hover:text-white transition-all ease-out duration-500' />

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <section className=''>
                                <hr className='w-[54rem] mx-4'></hr>

                                {/* Icons Div */}
                                <div className='m-2 flex'>
                                    <div className=' w-4/5 ml-1 h-20 flex items-center'>
                                        <div className='mx-2 flex flex-col items-center'>
                                            <FaBed className='m-1 text-center text-3xl' />
                                            <p className=''>{listing.beds} Beds</p>
                                        </div>

                                        <div className='mx-2 flex flex-col items-center'>
                                            <FaBath className='m-1 text-center text-3xl' />
                                            <p className=''>{listing.bath} Bathroom</p>
                                        </div>

                                        <div className='mx-2 flex flex-col items-center'>
                                            <TbRulerMeasure className='m-1 text-center text-3xl' />
                                            <p className=''>120sq yard</p>
                                        </div>
                                    </div>
                                </div>

                                {/* OverView Div */}
                                <div className='mx-2 w-[46rem]'>
                                    <div className='flex flex-row bg-slate-50 h-14 mb-3 '>
                                        <h1 className='m-3 text-2xl text-slate-700 font-bold '>Overview</h1>
                                    </div>

                                    <hr className='w-[54rem] mx-4'></hr>

                                    <div className='flex flex-col'>
                                        <h3 className='m-4 font-semibold text-slate-700'>Detailed</h3>
                                        <ul className='columns-2' >
                                            <li className='flex m-2 bg-slate-100 items-center'>
                                                <span className='min-w-[45%] mx-4 my-1 font-semibold'>Type</span>
                                                <span className='text-slate-900 truncate font-thin'>{listing?.type || "Flat"}  </span>
                                            </li>
                                            <li className='flex m-2 items-center'>
                                                <span className='min-w-[45%] mx-4 my-1 font-semibold'>Price</span>
                                                <span className='text-slate-900 truncate font-thin'>{listing?.type || "7.5 Crore"}  </span>
                                            </li>
                                            <li className='flex m-2 bg-slate-100 items-center'>
                                                <span className='min-w-[45%] mx-4 my-1 font-semibold'>Area</span>
                                                <span className='text-slate-900 truncate font-thin'>{listing?.type || "650 Sq. Yard"}  </span>
                                            </li>
                                            <li className='flex m-2 items-center'>
                                                <span className='min-w-[45%] mx-4 my-1 font-semibold'>Location</span>
                                                <span className='text-slate-900 truncate font-thin'>{listing?.type || "Malir, Karachi, Sindh"}  </span>
                                            </li>
                                            <li className='flex flex-wrap m-2 bg-slate-100 items-center '>
                                                <span className='min-w-[45%] mx-4 my-1 font-semibold'>Bath(s)</span>
                                                <span className='text-slate-900  truncate font-thin'>{listing?.type || "6"}  </span>
                                            </li>
                                            <li className='flex m-2 items-center'>
                                                <span className='min-w-[45%] mx-4 my-1 font-semibold'>Bedroom(s)</span>
                                                <span className='text-slate-900 truncate font-thin'>{listing?.type || "5"}  </span>
                                            </li>
                                            <li className='flex m-2 bg-slate-100 items-center'>
                                                <span className='min-w-[45%] mx-4 my-1 font-semibold'>Purpose</span>
                                                <span className='text-slate-900 truncate font-thin'>{listing?.type || "Sale"}  </span>
                                            </li>
                                            <li className='flex m-2 items-center'>
                                                <span className='min-w-[45%] mx-4 my-1 font-semibold'>Added</span>
                                                <span className='text-slate-900 truncate font-thin'>{listing?.type || "3 weeks ago"}  </span>
                                            </li>
                                        </ul>
                                        <hr className='w-[54rem] mx-4'></hr>

                                        <div className=''>
                                            <h3 className='m-4 font-semibold text-slate-700'>Description</h3>
                                            <pre className='mx-6 whitespace-pre-line text-[0.8rem] font-sans mb-6'>{listing.description}</pre>
                                        </div>
                                        <hr className='w-[54rem] mx-4'></hr>

                                        {/* Amenities  Div*/}

                                        <h3 className='m-4 font-semibold text-slate-700'>Amenities</h3>
                                        <ul className='' >
                                            <li className='flex mx-2 my-3  bg-slate-100 items-center w-[54rem] h-auto'>
                                                <span className='w-[20%]  ml-4 my-1 font-semibold'>Main Features</span>
                                                <div className='columns-2 ml-4'>
                                                    <span className='w-60  text-slate-900 truncate font-thin mr-6 flex items-center'><LuSofa className='mr-1' />Lobby in Building{listing?.lobby ? <FaCheckCircle className='text-green-500' /> : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className='w-60  text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faRecycle} className='mr-1' />Waste Disposal{listing?.lobby ? <FaCheckCircle className='text-green-500' /> : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className='w-60  text-slate-900 truncate font-thin mr-6 flex items-center'><PiElevatorBold className='mr-1' />Service Elevators in Building{listing?.lobby ? <FaCheckCircle className='text-green-500' /> : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                </div>
                                            </li>

                                            <li className='flex mx-2 my-3 bg-slate-100 items-center w-[54rem] h-auto'>
                                                <span className='w-[20%]  ml-4 my-1 font-semibold'>Rooms</span>
                                                <div className='columns-2'>
                                                    <span className=' text-slate-900 truncate font-thin mr-6 flex items-center'><FaBed className='mr-1' />Bedrooms: {listing?.beds ? listing.beds : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className=' text-slate-900 truncate font-thin mr-6 flex items-center'><FaBath className='mr-1' />Bathrooms: {listing?.bath ? listing.bath : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className=' text-slate-900 truncate font-thin mr-6 flex items-center'><MdOutlineAddHomeWork className='mr-1' />Servant Quarters: {listing?.servant ? listing.servant : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className=' text-slate-900 truncate font-thin mr-6 flex items-center'><RiSofaFill className='mr-1' />Drawing Room: {listing?.drawing_room ? listing.drawing_room : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className=' text-slate-900 truncate font-thin mr-6 flex items-center'><GiKnifeFork className='mr-1' />Dining Room: {listing?.dining ? listing.dining : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className=' text-slate-900 truncate font-thin mr-6 flex items-center'><FaKitchenSet className='mr-1' />Kitchens: {listing?.kitchen ? listing.kitchen : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className=' text-slate-900 truncate font-thin mr-6 flex items-center'><GiMirrorMirror className='mr-1' />Powder Room: {listing?.powder_room ? listing.powder_room : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className=' text-slate-900 truncate font-thin mr-6 flex items-center'><GrLounge className='mr-1' />Lounge or Sitting Room: {listing?.lounge ? listing.lounge : <GoXCircleFill className='text-red-500 ml-1' />}</span>

                                                </div>
                                            </li>
                                            <li className='flex mx-2 my-3 bg-slate-100 items-center w-[54rem] h-auto'>
                                                <span className='w-[20%]  ml-4 my-1 font-semibold'>Business and Communication</span>
                                                <div className='columns-2'>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FaWifi className='mr-1' />Broadband Internet Access {listing?.lobby ? <FaCheckCircle className='text-green-500' /> : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><LuSofa className='mr-1' />Satellite or Cable TV Ready{listing?.lobby ? <FaCheckCircle className='text-green-500' /> : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><LuSofa className='mr-1' />Business Center or Media Room in Building{listing?.lobby ? <FaCheckCircle className='text-green-500' /> : <GoXCircleFill className='text-red-500 ml-1' />}</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faTv} className='mr-1' />Satellite or Cable TV Ready{listing?.lobby ? <FaCheckCircle className='text-green-500' /> : <GoXCircleFill className='text-red-500 ml-1' />}</span>

                                                </div>
                                            </li>
                                            <li className='flex mx-2 my-3 bg-slate-100 items-center w-[54rem] h-20'>
                                                <span className='w-[20%] ml-4 my-1 font-semibold'>Community Features</span>
                                                <div className='columns-2'>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faDumbbell} className='mr-1' />Comunity Gym</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faSchool} className='mr-1' /> Nearby Schools</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faHospital} className='mr-1' />Nearby Hospitals</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faMosque} className='mr-1' />Nearby Mosque</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faPersonSwimming} className='mr-1' />Community Swimming Pool</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faHandsHoldingChild} className='mr-1' />DayCare Center</span>
                                                </div>
                                            </li>
                                            <li className='flex mx-2 my-3 bg-slate-100 items-center w-[54rem] h-20'>
                                                <span className='w-[20%] ml-4 my-1 font-semibold'>Community Features</span>
                                                <div className='columns-2'>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faDumbbell} className='mr-1' />Comunity Gym</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faSchool} className='mr-1' /> Nearby Schools</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faHospital} className='mr-1' />Nearby Hospitals</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faMosque} className='mr-1' />Nearby Mosque</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faPersonSwimming} className='mr-1' />Community Swimming Pool</span>
                                                    <span className='w-60 text-slate-900 truncate font-thin mr-6 flex items-center'><FontAwesomeIcon icon={faHandsHoldingChild} className='mr-1' />DayCare Center</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <hr className='w-[54rem] mx-4'></hr>

                                {/* Location Div */}

                                <div className='mx-4 w-[46rem]'>
                                    <div className='flex flex-row bg-slate-50 h-14 mt-3  '>
                                        <h1 className='m-3 text-2xl text-slate-700 font-bold '>Location and NearBy</h1>
                                    </div>
                                    <div className='bg-slate-200 my-2 rounded-lg text-justify'>

                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsum ut alias, quas eveniet minima excepturi nemo mollitia inventore voluptates, ex animi placeat corporis, officiis repellendus aliquam consequuntur repellat. Error magni nostrum eius, quod animi assumenda soluta vero ad consequuntur? Eligendi minus molestiae repellendus suscipit, cumque nostrum eveniet obcaecati eum. Tenetur corrupti ad, quam debitis dolore deleniti unde. Tempora expedita laborum corporis aspernatur magni odio. Cumque hic illo repellat, deserunt ipsam doloribus velit qui atque a temporibus quo minus facere veniam reiciendis iusto asperiores maxime! Architecto laboriosam inventore optio dicta illo nam consequatur in at saepe, tenetur quae corporis sequi amet eum molestiae quas minus sapiente cupiditate iure ipsa eius. Architecto, voluptatibus provident libero asperiores repudiandae voluptates error sed unde omnis officiis excepturi doloribus iusto iste, quo quia at, praesentium maxime molestiae itaque nemo eaque beatae. Nobis praesentium, ab sapiente suscipit natus vel obcaecati officia voluptas sunt soluta tempora reprehenderit alias accusantium ullam consequuntur molestiae amet labore, voluptatum, aliquid ut cupiditate! Corrupti quidem modi iste accusamus, voluptatibus enim consequatur porro nostrum officia consectetur aliquam culpa perferendis beatae repellendus, sed exercitationem facilis, temporibus dolores dolore totam doloremque voluptatem error delectus quo! Et est voluptate ut incidunt. Placeat sed officia harum accusantium!
                                    </div>
                                </div>



                            </section>
                        </div>
                    </main>
                    {/* <main>
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
                        <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg border shadow-lg  bg-white '>
                            <div className='bg-pink-300 w-full h-[200px] '></div>
                            <div className='bg-blue-400 w-full h-[200px] ' ></div>
                        </div>

                    </main> */}
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
