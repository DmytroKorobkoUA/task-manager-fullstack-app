# Express API with React Frontend

This project is a full-stack application that combines a RESTful API built with Express.js, Sequelize, and PostgreSQL for the backend with a React application for the frontend. The backend provides CRUD operations for managing tasks, user registration, authentication, and role-based access control. The frontend allows users to interact with these functionalities through a web interface.

## Project Srtucture
```bash
task-manager-fullstack-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   ├── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── ...
│
├── package.json
├── README.md
└── ...
```

## Features

### Backend

- **CRUD Operations**: Create, read, update, and delete tasks.
- **User Registration and Authentication**: Register and log in users using JWT tokens.
- **User Management**: Admins can create, update, and delete users.
- **Role-Based Access Control**: Differentiate access for admin and regular users.
- **Database Integration**: Uses PostgreSQL with Sequelize ORM.

### Frontend

- **React Application**: Provides a user interface for interacting with the backend API.
- **User Authentication**: Log in and manage sessions with JWT.
- **Task Management**: View, create, edit, and delete tasks.
- **Responsive Design**: Adaptable UI for different screen sizes.

## Requirements

- **Node.js**: Ensure you have Node.js (version 12 or later) installed.
- **PostgreSQL**: A running PostgreSQL server to connect to.

## Getting Started

### Installation

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/DmytroKorobkoUA/task-manager-fullstack-app.git
   cd task-manager-fullstack-app
   ```
   
2. **Install Dependencies**

   Install both backend and frontend dependencies:

   ```bash
   # Install root dependencies (concurrently and nodemon)
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```
   
3. **Environment Setup**

   Create a .env file in the root directory of the project and provide the necessary environment variables. An example configuration is provided below:

   ```bash
   DB_NAME=express_api
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   ```
   
4. **Database Setup**

   Ensure your PostgreSQL server is running and create a database matching the DB_NAME value in your .env file:

   ```bash
   CREATE DATABASE task_manager_fullstack_app;
   ```
   
   Run the following command to apply the database migrations and default seeds:
   ```bash
   npm run migrate
   npm run seed
   ```

### Running the Application

Start the server with:

   ```bash
   # From the root directory
   npm run dev
   ```

This will concurrently run the backend on http://localhost:3000 and the frontend on http://localhost:3001. The frontend will proxy API requests to the backend server.

## API Endpoints

### Task Management

- **GET /tasks**: Retrieve all tasks
- **POST /tasks**: Create a new task
- **GET /tasks/:id**:  Retrieve a specific task by ID
- **PUT /tasks/:id**: Update a task by ID
- **DELETE /tasks/:id**: Delete a task by ID

### User Management (Admin Only)

- **GET /admin/users**: Retrieve all users
- **POST /admin/users**: Create a new user
- **GET /admin/users/:id**:  Retrieve a specific user by ID
- **PUT /admin/users/:id**: Update a user by ID

### User Authentication

- **POST /users/register**: Register a new user
- **POST /users/login**: Log in an existing user

## Authentication and Authorization

- **JWT Authentication**: The API uses JSON Web Tokens (JWT) for authentication. Include the token in the Authorization header for endpoints that require authentication.
- **Role-Based Access Control**: Certain endpoints require admin privileges, enforced via middleware.

## Frontend Overview

The frontend is a React application that allows users to interact with the backend API. It provides a responsive UI for task management and user authentication.

### Scripts

- **Start the frontend**:
   ```bash
   npm start (from the frontend directory)
   ```
- **Build for production**:
   ```bash
   npm run build (from the frontend directory)
   ```
- **Run tests**:
   ```bash
   npm test (from the frontend directory)
   ```  

## Development

If you want to contribute or modify this project, ensure you are using a compatible Node.js version and have PostgreSQL installed locally.

### Backend    Development Commands:

- **Run Migrations**:
   ```bash
   npm run migrate
   ```
  
- **Seed Database**:
   ```bash
   npm run seed
   ```

- **Run Tests**:
   ```bash
   npm test
   ```

## Security Considerations

- **JWT Authentication**: The API uses JSON Web Tokens (JWT) for authentication. Include the token in the Authorization header for endpoints that require authentication.
- **Password Hashing**: User passwords are hashed using bcrypt before being stored in the database.
- **Environment Variable**: Store sensitive information in environment variables to keep them secure.
