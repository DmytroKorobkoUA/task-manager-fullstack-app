import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { Link } from 'react-router-dom';

function Tasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
                <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
                <Link to="/logout">Logout</Link>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Tasks;
