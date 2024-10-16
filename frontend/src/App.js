import React from 'react'
import Login from './components/Login.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import ResetPassword from './components/ResetPassword.jsx'
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/> 
        {/* This will replace '/' to '/login */}
        <Route path="/" element={<Navigate to = "/login" replace />} /> 
        <Route  path ='/signup' element ={<SignUp/>}/>
        <Route  path ='/home' element ={<Home/>}/>
        <Route path = 'resetpassword' element ={<ResetPassword/>}/>
      </Routes>
   </>
  )
}

export default App