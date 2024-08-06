import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Users.module.css';

const DeleteUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.role !== 'admin') {
            setError('You do not have access to this page.');
        }
    }, []);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/users');
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user. Please try again.');
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
                    <div className={styles.buttonWrapper}>
                        <button onClick={() => navigate('/users')} className={styles.cancelButton}>Back to Users</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Delete User</h1>
                <p className={styles.confirmation}>Are you sure you want to delete this user?</p>
                <div className={styles.buttonWrapper}>
                    <button onClick={handleDelete} className={styles.deleteButton}>Yes, Delete</button>
                    <button onClick={() => navigate('/users')} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;
