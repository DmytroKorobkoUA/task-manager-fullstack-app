import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Logout.module.css';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        navigate('/');
    }, [navigate]);

    return (
        <div className={styles.container}>
            <p className={styles.message}>Logging out...</p>
        </div>
    );
}

export default Logout;
