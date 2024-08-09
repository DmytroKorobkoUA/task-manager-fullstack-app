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

## Technologies Used
This project utilizes a variety of technologies to provide a robust and feature-rich full-stack application. The technologies include:

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side operations.
- **Express.js**: Web application framework for Node.js, used to build the RESTful API and serve the frontend.
- **PostgreSQL**: Relational database management system used for storing and managing data.
- **Redis**: In-memory data structure store, used for caching and optimizing performance.
- **React**: JavaScript library for building user interfaces, used for the frontend of the application.
- **GraphQL**: Query language for APIs, used to fetch and manage tasks data on both frontend and backend.
- **JSON Web Tokens (JWT)**: Token-based authentication used for securing API endpoints and managing user sessions.
- **Socket.io**: Library for real-time web socket communication, used for implementing chat functionality.
- **Mocha**: Testing framework for running unit and integration tests.
- **Chai**: Assertion library used with Mocha for writing tests.
- **CI/CD**: Continuous Integration and Continuous Deployment setup for automated testing and deployment on Render.
- **Docker**: Containerization platform used to package applications and dependencies for consistent deployment across environments.

## Features

### Backend

- **CRUD Operations**: Create, read, update, and delete tasks.
- **User Registration and Authentication**: Register and log in users using JWT tokens.
- **User Management**: Admins can create, update, and delete users.
- **Role-Based Access Control**: Differentiate access for admin and regular users.
- **Database Integration**: Uses PostgreSQL with Sequelize ORM.
- **Real-Time Chat**: Implements real-time chat functionality using WebSockets, allowing users to send and receive messages instantly.
- **Docker Support**: Backend services can be containerized and managed using Docker, simplifying deployment and scaling.

### Frontend

- **React Application**: Provides a user interface for interacting with the backend API.
- **User Authentication**: Log in and manage sessions with JWT.
- **Task Management**: View, create, edit, and delete tasks.
- **Real-Time Chat Interface**: Integrated chat interface using WebSockets for real-time message updates.
- **Responsive Design**: Adaptable UI for different screen sizes.
- **Docker Support**: Frontend can be containerized for easy deployment and consistency across environments.

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

   Create a .env file in the root, frontend, backend directories of the project and provide the necessary environment variables. An example configuration is provided below:

   ```bash
   NODE_ENV=production
   PORT=3000
   FRONTEND_URL=your_frontend_url
   
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=5432
   
   REDIS_URL=your_redis_url
   
   REACT_APP_API_BASE_URL=your_api_url
   REACT_APP_BACKEND_SERVER_BASE_URL=your_backend_url
   REACT_APP_GRAPHQL_API_URL=your_graphql_url
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

- **Development Setup**:
Start the server with:

   ```bash
   # From the root directory
   npm run dev
   ```

This will concurrently run the backend on http://localhost:3000 and the frontend on http://localhost:3001. The frontend will proxy API requests to the backend server.

- **Production Setup**: The application is configured to run in production using Render, which handles the deployment and scaling of the application.

- **Docker Deployment**: Alternatively, you can deploy the application using Docker. This allows for consistent environments across development, testing, and production.

    1. **Build and Run with Docker Compose**:
  
       Ensure Docker is installed and running on your machine. Then, from the root directory of the project, execute:

         ```bash
         docker-compose up --build
         ```

    2. **Access the Application**:
      Once the Docker containers are up and running, you can access the application at:

         - Frontend: **http://localhost:3001**
         - Backend API: **http://localhost:3000/api**

    3. **Stopping the Application**:
       To stop the application, use:

         ```bash
         docker-compose down
         ```

       This command will stop and remove the containers, but the data in PostgreSQL will persist due to the defined Docker volumes.

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
- **Role-Based Access Control**: Messages are instantly updated for all connected clients without requiring page reloads.

## Real-Time Chat

- **WebSocket Integration**: The application uses WebSockets for real-time chat functionality, allowing users to send and receive messages instantly.
- **Real-Time Message Updates**: Certain endpoints require admin privileges, enforced via middleware.

## Frontend Overview

The frontend is a React application that allows users to interact with the backend API. It provides a responsive UI for task management, user authentication, and real-time chat.
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

## Backend

### Development Commands:

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
