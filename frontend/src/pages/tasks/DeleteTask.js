import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';

const DeleteTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/tasks');
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Chat', to: '/chat' },
        { label: 'Logout', to: '/logout' }
    ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Delete Task</h1>
                <p className={styles.confirmation}>Are you sure you want to delete this task?</p>
                <div className={styles.buttonWrapper}>
                    <button onClick={handleDelete} className={styles.deleteButton}>Yes, Delete</button>
                    <button onClick={() => navigate(`/tasks/${id}`)} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTask;
