import React from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import ErrorPage from './pages/ErrorPage'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/create-listing' element={<PrivateRoute />}>
          <Route path='/create-listing' element={<CreateListing />} />
        </Route>
        <Route path='/edit-listing' element={<PrivateRoute />}>
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
        </Route>
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/category/:x/:listingId' element={<Listing/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </>

  )
}

export default App