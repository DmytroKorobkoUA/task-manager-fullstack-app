import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Users.module.css';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/admin/users`, { name, email, password, role }, {
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
        { label: 'Logout', to: '/logout' }
    ];

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
