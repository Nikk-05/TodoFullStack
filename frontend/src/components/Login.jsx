import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import todoIcon from '../asset/todoIcon.svg'; // Replace with your image path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log(loginData);
    axios.post('http://localhost:8000/api/v1/users/login',loginData,{withCredentials:true})
      .then((response) => {
        console.log(response.data)
        if (response.data.success) {
          toast.success("Logged in successfully")
          navigate('/home');
        }
      })
      .catch((error) => {
          const {message} = error.response.data
          console.log(message)
          console.log(error.response.data)
          toast.error(message || "Something went wrong! Please try again")
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl sm:max-w-sm sm:mx-auto sm:my-12 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
        <div className="text-center">
          <img className="mx-auto h-20 w-auto rounded-2xl" src={todoIcon} alt="Your Company" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Sign in to your account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={loginData.username}
              onChange={handleChange}
              required
              className="mt-2 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <Link to="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              autoComplete="current-password"
              required
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>

  );
};

export default LogIn;
