import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dashboard</h1>
            <p>Welcome back! Manage your tasks and view user information.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/users" style={{ marginRight: '10px' }}>Users</Link>
                <Link to="/tasks" style={{ marginRight: '10px' }}>Tasks</Link>
                <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
                <Link to="/logout">Logout</Link>
            </div>
        </div>
    );
}

export default Dashboard;
