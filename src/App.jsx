import React from 'react'
import { Routes, Route} from 'react-router'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Header from './Components/Header'

const App = () => {
  return (
    <>
  <Header/>
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/sign-in' element={<Signin/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/offers' element={<Offers/>}/>
      </Routes>
    
    </>

  )
}

export default App