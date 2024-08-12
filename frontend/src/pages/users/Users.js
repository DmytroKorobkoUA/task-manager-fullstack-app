import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Users.module.css';

const Users = React.memo(() => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('You do not have access to this page.');
            }
        };

        fetchUsers();
    }, []);

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Home', to: '/' },
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

    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const isAdmin = decodedToken.role === 'admin';

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Users</h1>
                {isAdmin && (
                    <div className={styles.linkWrapper}>
                        <Link to="/users/create" className={styles.createLink}>Create New User</Link>
                    </div>
                )}
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
                                {isAdmin && (
                                  <Link to={`/users/${user.id}`} className={styles.userLink}>
                                      {user.name}
                                  </Link>
                                )}
                                {!isAdmin && (
                                    <div>{user.name}</div>
                                )}
                            </td>
                            <td className={styles.userEmail}>{user.email}</td>
                            <td className={styles.userRole}>{user.role}</td>
                            <td className={styles.userActions}>
                                {isAdmin && (
                                    <>
                                        <Link to={`/users/update/${user.id}`} className={styles.userLink}>Edit</Link>
                                        <Link to={`/users/delete/${user.id}`} className={styles.deleteLink}>Delete</Link>
                                    </>
                                )}
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
