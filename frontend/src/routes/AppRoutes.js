import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Logout from '../pages/Logout';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/users/Users'));
const UserDetail = lazy(() => import('../pages/users/UserDetail'));
const CreateUser = lazy(() => import('../pages/users/CreateUser'));
const UpdateUser = lazy(() => import('../pages/users/UpdateUser'));
const DeleteUser = lazy(() => import('../pages/users/DeleteUser'));
const Tasks = lazy(() => import('../pages/tasks/Tasks'));
const TaskDetail = lazy(() => import('../pages/tasks/TaskDetail'));
const CreateTask = lazy(() => import('../pages/tasks/CreateTask'));
const UpdateTask = lazy(() => import('../pages/tasks/UpdateTask'));
const DeleteTask = lazy(() => import('../pages/tasks/DeleteTask'));
const Chat = lazy(() => import('../pages/Chat'));

function AppRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/users/:id" element={<UserDetail />} />
                            <Route path="/users/create" element={<CreateUser />} />
                            <Route path="/users/update/:id" element={<UpdateUser />} />
                            <Route path="/users/delete/:id" element={<DeleteUser />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/tasks/:id" element={<TaskDetail />} />
                            <Route path="/tasks/create" element={<CreateTask />} />
                            <Route path="/tasks/update/:id" element={<UpdateTask />} />
                            <Route path="/tasks/delete/:id" element={<DeleteTask />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/logout" element={<Logout />} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/" />} />
                    )}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default AppRoutes;
