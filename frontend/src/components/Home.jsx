import React, { useState } from 'react'
import '../styles/homeStyle.css'
import Navbar from './navbar';

function Home() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Sample Task", description: "This is a sample task description" },
        { id: 2, title: "Sample Task", description: "This is a sample task description" },
        { id: 3, title: "Sample Task", description: "This is a sample task description" },
        { id: 4, title: "Sample Task", description: "This is a sample task description" },
        { id: 5, title: "Sample Task", description: "This is a sample task description" },
        { id: 6, title: "Sample Task", description: "This is a sample task description" },
        { id: 7, title: "Sample Task", description: "This is a sample task description" },
        { id: 8, title: "Sample Task", description: "This is a sample task description" },
        { id: 9, title: "Sample Task", description: "This is a sample task description" },
        { id: 10, title: "Sample Task", description: "This is a sample task description" },
        { id: 11, title: "Sample Task", description: "This is a sample task description" },
        { id: 12, title: "Sample Task", description: "This is a sample task description" },
    
      ]);
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
    
      const addTask = () => {
        if (title && description) {
          setTasks([...tasks, { id: tasks.length + 1, title, description }]);
          setTitle("");
          setDescription("");
        }
      };
      const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
      };
    return (
        <>
        <Navbar/>
        <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-gray-100 p-5">
      {/* Tasks List on Left */}
      <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6 lg:mb-0 lg:mr-6">
        {tasks.length ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between relative"
            >
              <button
                onClick={() => deleteTask(task.id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
              <p className="text-gray-600 mt-2">{task.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No tasks added yet!</p>
        )}
      </div>

      {/* Task Creation Form on Right */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        ></textarea>
        <button
          onClick={addTask}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </div>
        </>
    )
}
export default Home;