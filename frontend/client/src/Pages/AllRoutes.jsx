import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import AcceptedEvents from './AcceptedEvents'
import SinglePageEvent from './SinglePageEvent'
import Profile from './Profile'
import ProfileEventView from './ProfileEventView'
import AppliedEvents from './AppliedEvents'
import NotFound from './NotFound'

const AllRoutes = () => {
  return (
    <Routes>
    <Route path="/home" element={<Home/>}/>
    <Route path="/accepted" element={<AcceptedEvents/>}/>
    <Route path="/applied" element={<AppliedEvents/>}/>
    <Route path="/event/:id" element={<SinglePageEvent/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/profile/event/:id" element={<ProfileEventView/>}/>
    <Route path="/" element={<Login/>}>Login</Route>
    <Route path="*" element={<NotFound/>}/>
</Routes>
  )
}

export default AllRoutes