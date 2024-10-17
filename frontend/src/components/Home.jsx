import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai';
import Navbar from './navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [user, setUser] = useState("")
  const [tasks, setTasks] = useState([
    {
      id:'',
      title: "Sample Task",
      description: "This is a sample task description"
    }
  ])
  useEffect(() => {
    console.log("useEffect run")
    axios.get('http://localhost:8000/api/v1/users/usertask', { withCredentials: true })
      .then((res) => {
        console.log(res.data.data.taskList)
        setUser(res.data.data.fullName)
        setTasks(res.data.data.taskList)
        console.log(tasks)
      })
      .catch((err) => console.log(err))
  }, [])

  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const addTask = () => {
    if (title && description) {
      setTasks([...tasks, { id: tasks.length + 1, title, description }]);
      setTitle("");
      setDescription("");
      toast.success("Your task added");
    }
  };

  const handleSignOut = () => {
    // Implement sign out logic here
    console.log("Sign out button clicked");
    axios.get('http://localhost:8000/api/v1/users/logout', { withCredentials: true })
      .then((res) => {
        console.log(res)
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message || "Failed to sign out")
      })
  };
  const handleEditTask = (id) => {
    // Implement task edit logic here

  };
  const handleDeleteTask = (id) => {
    // Implement task delete logic here
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-yellow-100 p-5 lg:flex-col lg:justify-center">
        <ToastContainer position="top-right" autoClose={3000} />
        {/* User Icon with Dropdown */}
        <div className="absolute top-5 right-5">
          <div className="relative inline-block">
            <FaUserCircle
              className="text-4xl text-indigo-600 cursor-pointer"
              onClick={handleUserIconClick}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                <h2 className="block w-full px-4 py-2 text-gray-700 transition-colors">{user}</h2>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Task Creation Form */}
        <div className="max-w-full mb-3 bg-white rounded-lg shadow-lg p-6 mt-6 lg:mt-2 lg:mb-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Create New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded shadow-sm"
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded shadow-sm"
          ></textarea>
          <button
            onClick={addTask}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
          >
            Add Task
          </button>
        </div>

        {/* Task List Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between relative hover:shadow-2xl transition-shadow duration-300 text-justify"
              >
                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                <p className="text-gray-600 mt-2">{task.description.split("", 100)}...</p>
                <div className="flex justify-end mt-4 space-x-2">
                  <FiEdit
                    onClick={handleEditTask}
                    className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-600"
                    title="Edit Task"
                  />
                  <AiFillDelete
                    onClick={handleDeleteTask}
                    className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-600"
                    title="Delete Task"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No tasks added yet!</p>
          )}
        </div>
      </div>
    </>
  )
}
export default Home;