import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Users.module.css';

const UpdateUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                if (decodedToken.role !== 'admin') {
                    setError('You do not have access to this page.');
                    return;
                }
                const response = await axios.get(`${API_BASE_URL}/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Failed to fetch user data. Please try again.');
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_BASE_URL}/admin/users/${id}`, { name, email, password, role }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate(`/users/${id}`);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user. Please try again.');
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
                    <div className={styles.linkWrapper}>
                        <Link to="/users" className={styles.link}>Back to Users</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Update User</h1>
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
                    <button type="submit" className={styles.submitButton}>Update User</button>
                </form>
                <div className={styles.linkWrapper} style={{ marginTop: '20px' }}>
                    <Link to={`/users/${id}`} className={styles.link}>Back to User Details</Link>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
