import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Tasks from '../pages/Tasks';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Logout from '../pages/Logout';

function AppRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {isAuthenticated ? (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/logout" element={<Logout />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
