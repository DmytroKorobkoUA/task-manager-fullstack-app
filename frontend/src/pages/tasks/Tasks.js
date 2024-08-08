import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../../graphql/taskQueries';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';

const Tasks = () => {
    const { loading, error, data } = useQuery(GET_TASKS);

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Home', to: '/' },
        { label: 'Chat', to: '/chat' },
        { label: 'Logout', to: '/logout' },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching tasks: {error.message}</p>;

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Tasks</h1>
                <div className={styles.linkWrapper}>
                    <Link to="/tasks/create" className={styles.createLink}>
                        Create New Task
                    </Link>
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
                    {data.getAllTasks.map((task) => (
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
                                <Link to={`/tasks/update/${task.id}`} className={styles.taskLink}>
                                    Edit
                                </Link>
                                <Link to={`/tasks/delete/${task.id}`} className={styles.deleteLink}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tasks;
