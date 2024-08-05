import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

function Home() {
    const token = localStorage.getItem('token');
    const links = token
        ? [
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Logout', to: '/logout' },
        ]
        : [
            { label: 'Login', to: '/login' },
            { label: 'Register', to: '/register' },
        ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Welcome to the Task Manager</h1>
                <p className={styles.description}>
                    Manage your tasks efficiently with our intuitive task manager application.
                </p>
            </div>
        </div>
    );
}

export default Home;
