import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit} from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai';
import Navbar from './navbar';
import '../styles/homeStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function House() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Sample Task", description: "This is a sample task description" },
        { id: 2, title: "Sample Task", description: "This is a sample task description" },
        { id: 3, title: "Task 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum asperiores eos eligendi inventore atque ipsam et, perferendis eveniet rem nihil quod esse aperiam, placeat expedita enim reprehenderit quia rerum debitis nam! Optio dolore impedit molestiae eveniet minus tenetur repellat magnam, a distinctio pariatur saepe? Quam praesentium ex ipsa molestias deserunt, molestiae est maiores ad ut. Ullam aperiam vel aspernatur blanditiis quod possimus minima, veritatis fugit nisi quasi officia illo officiis accusamus doloremque praesentium! Quos, assumenda, neque ab libero voluptatem ducimus optio voluptas modi sapiente quia odit sunt rerum minima, recusandae accusantium eveniet tempora animi dolorem perspiciatis facilis? Dolores, nulla accusamus." },
        // Add more sample tasks as needed
    ]);

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

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleUserIconClick = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-start min-h-screen bg-yellow-100 p-5 lg:flex-row lg:justify-center">
                {/* User Icon with Dropdown */}
                <div className="absolute top-5 right-5">
                    <div className="relative inline-block">
                        <FaUserCircle
                            className="text-4xl text-indigo-600 cursor-pointer"
                            onClick={handleUserIconClick}
                        />
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                                <button
                                    onClick={() => alert('Signing out...')}
                                    className="block w-full px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Task List Section */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {tasks.length ? (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between relative hover:shadow-2xl transition-shadow duration-300 text-justify"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                                <p className="text-gray-600 mt-2">{task.description.split("",100)}...</p>
                                <div className="flex justify-end mt-4 space-x-2">
                                    <FiEdit
                                        className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-600"
                                        title="Edit Task"
                                    />
                                    <AiFillDelete
                                        onClick={() => console.log(task.id)}
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

                {/* Task Creation Form */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6 mt-6 lg:mt-0 lg:ml-6">
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
            </div>
        </>
    );
}

export default House;
