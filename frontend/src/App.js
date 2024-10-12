import React from 'react'
import LogIn from './components/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
function App() {
  return (
    <>
    <Home/>
    <Router>
      <Routes>
        {/* <Route exact path='/' element = {<SignIn/>} /> */}
        <Route  path ='/signUp' element ={<SignUp/>}/>
      </Routes>
    </Router>
    <SignUp/>
   </>
  )
}

export default App