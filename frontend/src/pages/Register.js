import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import Navbar from '../components/Navbar';
import styles from '../styles/Auth.module.css';

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

    const links = [
        { label: 'Home', to: '/' },
        { label: 'Login', to: '/login' }
    ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.formWrapper}>
                <h1 className={styles.header}>Register</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </label>
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
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            className={styles.checkbox}
                        />
                        Admin
                    </label>
                    <button type="submit" className={styles.button}>Register</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
                <div className={styles.linkWrapper}>
                    <Link to="/" className={styles.link}>Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
