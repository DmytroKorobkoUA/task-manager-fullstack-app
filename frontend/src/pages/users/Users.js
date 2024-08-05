import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Users.module.css';

const Users = React.memo(() => {
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

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Home', to: '/' },
        { label: 'Logout', to: '/logout' }
    ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Users</h1>
                <div className={styles.linkWrapper}>
                    <Link to="/users/create" className={styles.createLink}>Create New User</Link>
                </div>
                <table className={styles.userTable}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className={styles.userName}>
                                <Link to={`/users/${user.id}`} className={styles.userLink}>
                                    {user.name}
                                </Link>
                            </td>
                            <td className={styles.userEmail}>{user.email}</td>
                            <td className={styles.userRole}>{user.role}</td>
                            <td className={styles.userActions}>
                                <Link to={`/users/update/${user.id}`} className={styles.userLink}>Edit</Link>
                                <Link to={`/users/delete/${user.id}`} className={styles.deleteLink}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default Users;
