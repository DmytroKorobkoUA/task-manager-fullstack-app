import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Users.module.css';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Users', to: '/users' },
        { label: 'Logout', to: '/logout' }
    ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>User Details</h1>
                <div className={styles.linkWrapper}>
                    <Link to="/users" className={styles.link}>Back to Users</Link>
                    <Link to={`/users/update/${id}`} className={styles.link}>Update User</Link>
                    <Link to={`/users/delete/${id}`} className={styles.deleteLink}>Delete User</Link>
                    <Link to="/users/create" className={styles.createLink}>Create New User</Link>
                </div>
                {user ? (
                    <div className={styles.userDetails}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                ) : (
                    <p className={styles.loading}>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
