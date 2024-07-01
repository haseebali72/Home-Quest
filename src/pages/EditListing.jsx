import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import { DevTool } from '@hookform/devtools'
import { storeImages } from '../firebase/fileUploads.firebase'
import { ColorCircleLoaderFull } from '../Components/Loader'
import { toast } from 'react-toastify'
import { addListing, updateListing } from '../firebase/usermodification.firebase'
import { useNavigate, useParams } from 'react-router'
import { doc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { DevTool } from '@hookform/devtools'

const EditListing = () => {
    const [loading, setLoading] = useState(false)
    const [listing, setListing] = useState(null)
    const navigate = useNavigate()
    const params = useParams()
    
    const form = useForm({
        defaultValues : {
            category : listing?.category || "not found",
            name : listing?.name || "not found",
            beds : listing?.beds || "not found",
            bath : listing?.bath || "not found" ,
            description : listing?.description || "not found",
            furnished : listing?.furnished || "not found",
            curreny : listing?.currency || "not found",
            imageURLs :listing?.imageURLs|| "not found",
            offer :listing?.offer || "not found",
            parking : listing?.parking || "not found",
            price : listing?.price || "not found",
            address : listing?.address || "not found"
        }
    })
    const { register, handleSubmit, control, reset } = form

    const formSubmission = async (data) => {
        const { images } = data
        setLoading(true)
        const imageURLs = await Promise.all([...images].map((image) => storeImages(image)))
        .catch(error => {
                setLoading(false)
                toast.error("Images not uploaded", error)
                return
            })
        console.log(imageURLs)
        data.imageURLs = imageURLs
        data.timestamp = serverTimestamp()
        data.userRef = auth.currentUser.uid
        delete data.images

        console.log(data)
        
        const listingDoc = await updateListing(data, params.listingId)
        if(listingDoc.docUpdated){
            setLoading(false)
            toast.success("Lisitng updated")
            navigate(`/category/${data.category}/${listingDoc.docRef.id}`)
            reset()
            return  
        }
        if(listingDoc.errorinCatch){
            setLoading(false)
            toast.error(listingDoc.errorinCatch)
            return
        }
    }
   

    useEffect(()=>{
        setLoading(true)
        const fetchListing = async()=>{
            const docRef = doc(db,"listings", params.listingId)
            const docSnap = await getDoc(docRef)
            const document = docSnap.data()
            // console.log(document)
            if(docSnap.exists()){
                setListing(document)
                reset(document)
                setLoading(false)
            }else{
                navigate("/")
                toast.error("Listing doesnot Exists")
            }
        }
        fetchListing()
    },[params.listingId, navigate])
    // console.log(listing)
    useEffect(()=>{
        if(listing && listing.userRef !== auth.currentUser.uid ){
            toast.error("This link is expired")
            navigate("profile")
        }
    })
    
    return (
        loading ? <ColorCircleLoaderFull /> : listing ?
            <>
                <main className='max-w-md px-2 mx-auto'>
                    <h1 className='text-3xl text-center mt-6 font-bold'>
                        Edit your Lisitng
                    </h1>
                    <form onSubmit={handleSubmit(formSubmission)} id='listing_form'>

                        {/* Category */}
                        <div className='flex flex-col'>
                            <label htmlFor='category' className='text-lg mt-6 font-semibold m-1' >Sell/Rent</label>
                            <select id="category" {...register("category", {
                                required: {
                                    value: true,
                                    message: "Listing Category Required"
                                }
                            })}>
                                <option value="rent">Rent</option>
                                <option value="sale">Sale</option>
                            </select>
                        </div>

                        {/* name */}
                        <div className='flex flex-col'>
                            <label htmlFor='name' className='text-lg mt-6 font-semibold m-1' >Name</label>
                            <input type='text' id='name' {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name Required"
                                }
                            })} />
                        </div>

                        {/* bed */}
                        <div className='flex flex-col'>
                            <label htmlFor='beds' className='text-lg mt-6 font-semibold m-1' >Bed Room</label>
                            <input type='number' id='beds' {...register("beds", {
                                required: {
                                    value: true,
                                    message: "No. of Beds?"
                                }
                            })} />
                        </div>

                        {/* bath */}
                        <div className='flex flex-col'>
                            <label htmlFor='bath' className='text-lg mt-6 font-semibold m-1' >Bath Room</label>
                            <input type='number' id='bath' {...register("bath", {
                                required: {
                                    value: true,
                                    message: "No. of Bathroom?"
                                }
                            })} />
                        </div>

                        {/* parking */}
                        <div className='flex flex-col'>
                            <label htmlFor='parking' className='text-lg mt-6 font-semibold m-1' >Parking Spot</label>
                            <select id="parking" {...register("parking", {
                                required: {
                                    value: true,
                                    message: "Parking Available??"
                                }
                            })}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* furnished */}
                        <div className='flex flex-col'>
                            <label htmlFor='furnished' className='text-lg mt-6 font-semibold m-1' >Furnished</label>
                            <select id="furnished" {...register("furnished", {
                                required: {
                                    value: true,
                                    message: "Is Furnished??"
                                }
                            })}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* address */}
                        <div className='flex flex-col'>
                            <label htmlFor='address' className='text-lg mt-6 font-semibold m-1' >Address</label>
                            <input type='text' id='address' {...register("address", {
                                required: {
                                    value: true,
                                    message: "Address Required"
                                }
                            })} />
                        </div>

                        {/* description */}
                        <div className='flex flex-col'>
                            <label htmlFor='description' className='text-lg mt-6 font-semibold m-1' >Description</label>
                            <textarea form='listing_form' id='description' {...register("description")} />
                        </div>

                        {/* offer */}
                        <div className='flex flex-col'>
                            <label htmlFor='offer' className='text-lg mt-6 font-semibold m-1' >Offer</label>
                            <select id="offer" {...register("offer", {
                                required: {
                                    value: true,
                                    message: "Offer Available??"
                                }
                            })}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className='flex flex-col'>
                            <label htmlFor='price' className='text-lg mt-6 font-semibold m-1' >Price</label>
                            <input type='number' id='price' {...register("price", {
                                required: {
                                    value: true,
                                    message: "Price Required"
                                }
                            })} />
                        </div>

                        {/* currency */}
                        <div className='flex flex-col'>
                            <label htmlFor='currency' className='text-lg mt-6 font-semibold m-1' >Currency</label>
                            <select id="currency" {...register("currency", {
                                required: {
                                    value: true,
                                    message: "currency required"
                                }
                            })}>
                                <option value="PKR">PKR</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>

                        {/* images */}
                        <div className='flex flex-col'>
                            <label htmlFor='images' className='text-lg mt-6 font-semibold m-1' >Images</label>
                            <input type='file' multiple accept='.jpeg, .png, .jpg' id='images' {...register("images", {
                                required: {
                                    value: true,
                                    message: "Images Required"
                                },
                                validate: (value) => value.length <= 6 || "Maximum 6 images allowed"
                            })} />
                        </div>

                        <input value="Edit Listing" type='submit' className='my-6 w-full px-7 py-3 bg-blue-600 text-white text-sm font-medium uppercase rounded-none shadow-md hover:bg-blue-700 active:scale-95 ' />

                    </form>
                    <DevTool control={control}/>
                </main>
            </> : <h1>List not loading</h1>

    )
}

export default EditListing
