import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import {ColorCircleLoaderFull} from './Components/Loader'
import Category from './pages/Category'

const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'))
const Offers = lazy(() => import('./pages/Offers'))
const Signin = lazy(() => import('./pages/Signin'))
const Signup = lazy(() => import('./pages/Signup'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const CreateListing = lazy(() => import('./pages/CreateListing'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const EditListing = lazy(() => import('./pages/EditListing'))
const Listing = lazy(() => import('./pages/Listing'))

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<ColorCircleLoaderFull />}>
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
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/category/:categoryName/:listingId' element={<Listing />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App