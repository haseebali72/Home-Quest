import React, { useEffect, useState } from 'react'
import Logo from "/Logo.png"
import { NavLink } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"
const Header = () => {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setisAuthenticated(true)
            } else {
                setisAuthenticated(false)
            }
        })
    }, [])
    
    const headerList = [
        { name: "Home", path: "/home", id: 1 },
        { name: "Offers", path: "/offers", id: 2 },
        isAuthenticated ?
            { name: "Profile", path: "/profile", id: 4 } :
            { name: "Sign In", path: "/sign-in", id: 3 },
    ]
    return (
        <>
            <div className='border-b shadow-xl top-0 sticky z-50 bg-white'>
                <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                    <div className=''>
                        <img
                            src={Logo}
                            alt='Home Quest'
                            className='h-20 w-20'
                        />
                    </div>
                    <div>
                        <ul className='flex space-x-10 align-middle'>
                            {headerList.map(list => <li key={list.id}><NavLink className={({ isActive }) => isActive ? " py-7 border-b-[3px] border-b-red-500 text-black" : "text-gray-400"} to={list.path}>{list.name}</NavLink></li>)}
                        </ul>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Header