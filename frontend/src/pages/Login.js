import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
            localStorage.setItem('token', response.data.token); // Сохраните токен
            setMessage('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            setMessage('Login failed!');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <div style={{ marginTop: '20px' }}>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default Login;
