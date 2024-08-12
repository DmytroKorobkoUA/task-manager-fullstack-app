import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Users.module.css';
import DOMPurify from 'dompurify';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.role !== 'admin') {
            setError('You do not have access to this page.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sanitizedName = DOMPurify.sanitize(name);
        const sanitizedEmail = DOMPurify.sanitize(email);
        const sanitizedPassword = DOMPurify.sanitize(password);
        const sanitizedRole = DOMPurify.sanitize(role);

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/admin/users`, {
                name: sanitizedName,
                email: sanitizedEmail,
                password: sanitizedPassword,
                role: sanitizedRole
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/users');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Users', to: '/users' },
        { label: 'Chat', to: '/chat' },
        { label: 'Logout', to: '/logout' }
    ];

    if (error) {
        return (
            <div className={styles.container}>
                <Navbar links={links} />
                <div className={styles.content}>
                    <h1 className={styles.header}>Access Denied</h1>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Create New User</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={styles.formSelect}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton}>Create User</button>
                </form>
                <div className={styles.linkWrapper}>
                    <Link to="/users" className={styles.link}>Back to Users</Link>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
