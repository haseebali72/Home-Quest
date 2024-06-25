import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
const CreateListing = () => {
    const form = useForm()
    const { register, handleSubmit, control } = form
    const formSubmission = () => {alert("Form Submitted") }
    return (
        <>
            <main className='max-w-md px-2 mx-auto'>
                <h1 className='text-3xl text-center mt-6 font-bold'>
                    Create a Listing
                </h1>
                <form onSubmit={handleSubmit(formSubmission)} id='listing_form'>
                    <div className='flex flex-col'>
                        <label htmlFor='category' className='text-lg mt-6 font-semibold m-1' >Sell/Rent</label>
                        <select id="category" {...register("listing-category", {
                            required: {
                                value: true,
                                message: "Listing Category Required"
                            }
                        })}>
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='name' className='text-lg mt-6 font-semibold m-1' >Name</label>
                        <input type='text' id='name' {...register("name", {
                            required :{
                                value : true,
                                message : "Name Required"
                            }
                        })}/>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='beds' className='text-lg mt-6 font-semibold m-1' >Bed Room</label>
                        <input type='number' id='beds' {...register("beds", {
                            required :{
                                value : true,
                                message : "No. of Beds?"
                            }
                        })}/>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='bath' className='text-lg mt-6 font-semibold m-1' >Bath Room</label>
                        <input type='number' id='bath' {...register("bath", {
                            required :{
                                value : true,
                                message : "No. of Bathroom?"
                            }
                        })}/>
                    </div>

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

                    <div className='flex flex-col'>
                        <label htmlFor='address' className='text-lg mt-6 font-semibold m-1' >Address</label>
                        <input type='text' id='address' {...register("address", {
                            required :{
                                value : true,
                                message : "Address Required"
                            }
                        })}/>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='description' className='text-lg mt-6 font-semibold m-1' >Description</label>
                        <textarea form='listing_form' id='description' {...register("description")}/>
                    </div>

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

                    <div className='flex flex-col'>
                        <label htmlFor='price' className='text-lg mt-6 font-semibold m-1' >Price</label>
                        <input type='number' id='price' {...register("price", {
                            required :{
                                value : true,
                                message : "Price Required"
                            }
                        })}/>
                    </div>


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

                    <div className='flex flex-col'>
                        <label htmlFor='images' className='text-lg mt-6 font-semibold m-1' >Images</label>
                        <input type='file' multiple accept='.jpeg, .png, .jpg' id='images' {...register("images", {
                            required :{
                                value : true,
                                message : "Images Required"
                            }
                        })}/>
                    </div>

                    <input type='submit' className='my-6 w-full px-7 py-3 bg-blue-600 text-white text-sm font-medium uppercase rounded-none shadow-md hover:bg-blue-700 active:scale-95 '/>

                </form>
                <DevTool control={control}/>
            </main>

        </>
    )
}

export default CreateListing
