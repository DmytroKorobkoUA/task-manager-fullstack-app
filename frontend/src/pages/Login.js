import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';
import Navbar from '../components/Navbar';
import styles from '../styles/Auth.module.css';
import DOMPurify from 'dompurify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sanitizedEmail = DOMPurify.sanitize(email);
        const sanitizedPassword = DOMPurify.sanitize(password);

        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, {
                email: sanitizedEmail,
                password: sanitizedPassword
            });
            localStorage.setItem('token', response.data.token); // Save token
            setMessage('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            setMessage('Login failed!');
        }
    };

    const links = [
        { label: 'Home', to: '/' },
        { label: 'Register', to: '/register' }
    ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.formWrapper}>
                <h1 className={styles.header}>Login</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </label>
                    <button type="submit" className={styles.button}>Login</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
                <div className={styles.linkWrapper}>
                    <Link to="/" className={styles.link}>Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
