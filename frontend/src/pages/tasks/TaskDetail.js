import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchTask();
    }, [id]);

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Logout', to: '/logout' }
    ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Task Details</h1>
                <div className={styles.linkWrapper}>
                    <Link to="/tasks" className={styles.link}>Back to Tasks</Link>
                    <Link to={`/tasks/update/${id}`} className={styles.link}>Update Task</Link>
                    <Link to={`/tasks/delete/${id}`} className={styles.deleteLink}>Delete Task</Link>
                    <Link to="/tasks/create" className={styles.link}>Create New Task</Link>
                </div>
                {task ? (
                    <div className={styles.taskDetails}>
                        <p><strong>Title:</strong> {task.title}</p>
                        <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
                    </div>
                ) : (
                    <p className={styles.loading}>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default TaskDetail;
