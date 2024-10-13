# TodoFullStack
A full-stack To-Do List application built with a React frontend and Node.js/Express backend, designed to allow users to create, update, and manage their tasks efficiently. The project includes user authentication, task creation, deletion, updating functionalities, and displays error and success notifications using react-toastify.

# Table of Contents
  Project Overview
  Features
  Tech Stack
  Setup and Installation
  Project Structure
  Usage
  API Endpoints
  Error Handling
  Future Improvements
  Contributing
  License
  
# Project Overview
This To-Do List application is a responsive, user-friendly app that allows users to:

# Sign up and log in
Add, update, and delete tasks
View tasks in a well-structured list with task details
Receive notifications for success, warnings, and errors
# Features
User Authentication: Secure sign-up and login with validation.
Task Management: Create, view, update, and delete tasks.
Notifications: Displays toast notifications for success, errors, and warnings.
Responsive Design: Optimized for both desktop and mobile.
Smooth UI Transitions: Clean and modern UI with animations for a better UX.

# Tech Stack
Frontend: React, Tailwind CSS, React Toastify
Backend: Node.js, Express, MongoDB
Database: MongoDB for data persistence
API Testing: Postman
Setup and Installation
Prerequisites
Node.js (v14+)
MongoDB (local or cloud)

# Project Structure
    .
    ├── backend
    │   ├── controllers
    │   ├── models
    │   ├── routes
    │   ├── middleware
    │   ├── utils
    │   └── index.js
    └── frontend
        ├── public
        ├── src
        │   ├── components
        │   ├── styles
        │   └── App.js

    
# Usage
Sign Up: Go to /signup to register a new user.
Sign In: Go to /signin to log in with an existing account.
Dashboard: View and manage your tasks from the main dashboard after logging in.

# API Endpoints
User Routes
POST /api/v1/users/signup: Register a new user.
POST /api/v1/users/login: Authenticate a user and return a JWT.

# Task Routes
GET /api/v1/tasks: Retrieve all tasks for a user.
POST /api/v1/tasks: Create a new task.
PUT /api/v1/tasks/:id: Update a specific task by ID.
DELETE /api/v1/tasks/:id: Delete a specific task by ID.

# Error Handling
All errors are handled through a custom error handler (APIError). Errors are returned with a structured response:
On the front end, react-toasty displays these errors as toast notifications.

# Future Improvements
Search and Filter: Allow users to search for specific tasks.
Subtasks: Enable support for nested tasks.
Reminders: Add due dates and reminder notifications.

#License
This project is licensed under the MIT License.
