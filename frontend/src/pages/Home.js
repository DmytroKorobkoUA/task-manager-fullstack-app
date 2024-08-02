import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const token = localStorage.getItem('token');

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Task Manager</h1>
            <p>Manage your tasks efficiently with our intuitive task manager application.</p>
            <div style={{ marginTop: '20px' }}>
                {token ? (
                    <>
                        <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
