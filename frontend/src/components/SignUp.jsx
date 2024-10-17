import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import todoIcon from '../asset/todoIcon.svg'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    axios.post('http://localhost:8000/api/v1/users/signup', formData)
      .then((response) => {
        console.log(response)
        toast.success("User created successfully")
        // Redirect to the login page
       navigate("/login")
      })
      .catch((error) => {
        // Check if the error has a response object
        if (error.response) {
          const { status, data } = error.response;
          // You can set this error message to display on the UI
          toast.error(data.message || "An error occurred, please try again.");
        } else {
          // If no response is available, log or handle a generic error
          toast.error(error.message || "Network error, please try again later.");
        }
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="w-full max-w-md p-4 space-y-8 bg-white shadow-lg rounded-xl sm:max-w-sm sm:mx-auto sm:my-12 lg:px-8">
        <div className="text-center">
          <img className="mx-auto h-20 w-auto rounded-2xl" src={todoIcon} alt="Your Company" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Create an account</h2>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
