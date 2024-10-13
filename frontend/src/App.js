import React from 'react'
import LogIn from './components/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import House from './components/House.jsx'
function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element = {<LogIn/>} />
        <Route  path ='/signup' element ={<SignUp/>}/>
        <Route  path ='/home' element ={<Home/>}/>
        <Route path = '/house' element ={<House/>}/>
      </Routes>
   </>
  )
}

export default App