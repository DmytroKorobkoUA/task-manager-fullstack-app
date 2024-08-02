import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/users/register`, {
                name,
                email,
                password,
                role: isAdmin ? 'admin' : 'user'
            });
            localStorage.setItem('token', response.data.token);
            setMessage('Registration successful!');
            navigate('/dashboard');
        } catch (error) {
            setMessage('Registration failed!');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    Admin
                </label>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <div style={{ marginTop: '20px' }}>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default Register;
