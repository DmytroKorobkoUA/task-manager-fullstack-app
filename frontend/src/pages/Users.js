import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { Link } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
                <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
                <Link to="/logout">Logout</Link>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
