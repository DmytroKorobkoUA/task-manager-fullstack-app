import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';

const Tasks = React.memo(() => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Home', to: '/' },
        { label: 'Chat', to: '/chat' },
        { label: 'Logout', to: '/logout' }
    ];

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Tasks</h1>
                <div className={styles.linkWrapper}>
                    <Link to="/tasks/create" className={styles.createLink}>Create New Task</Link>
                </div>
                <table className={styles.taskTable}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td className={styles.taskTitle}>
                                <Link to={`/tasks/${task.id}`} className={styles.taskLink}>
                                    {task.title}
                                </Link>
                            </td>
                            <td className={styles.taskCompleted}>
                                {task.completed ? 'Yes' : 'No'}
                            </td>
                            <td className={styles.taskActions}>
                                <Link to={`/tasks/update/${task.id}`} className={styles.taskLink}>Edit</Link>
                                <Link to={`/tasks/delete/${task.id}`} className={styles.deleteLink}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default Tasks;
