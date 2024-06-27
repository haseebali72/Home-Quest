import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { auth } from '../firebase/firebase'
import { ColorCircleLoader } from './Loader'

const PrivateRoute = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    }, [])

    if(checkingStatus){
        return <ColorCircleLoader/>
    }

    return loggedIn  ? <Outlet/> : <Navigate to="/sign-in"/>
}

export default PrivateRoute