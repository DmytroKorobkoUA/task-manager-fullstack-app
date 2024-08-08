import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASK } from '../../graphql/taskQueries';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';

const TaskDetail = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_TASK, {
        variables: { id },
    });

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Chat', to: '/chat' },
        { label: 'Logout', to: '/logout' },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching task: {error.message}</p>;

    const task = data.getTaskById;

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Task Detail</h1>
                <div className={styles.taskDetail}>
                    <h2>{task.title}</h2>
                    <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
                    <p><strong>Assigned User:</strong> {task.user.name}</p>
                </div>
                <Link to="/tasks" className={styles.backLink}>
                    Back to Tasks
                </Link>
            </div>
        </div>
    );
};

export default TaskDetail;
