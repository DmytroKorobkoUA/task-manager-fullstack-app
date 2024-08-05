import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Dashboard.module.css';

function Dashboard() {
    const links = [
        { label: 'Home', to: '/' },
        { label: 'Users', to: '/users' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Logout', to: '/logout' }
    ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Dashboard</h1>
                <p className={styles.description}>Welcome back! Manage your tasks and view user information.</p>
            </div>
        </div>
    );
}

export default Dashboard;
