import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_TASK, GET_TASKS } from '../../graphql/taskQueries';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';

const DeleteTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [deleteTask, { loading, error }] = useMutation(DELETE_TASK, {
        variables: { id },
        refetchQueries: [{ query: GET_TASKS }],
        onCompleted: () => {
            navigate('/tasks');
        }
    });

    const handleDelete = async () => {
        try {
            await deleteTask();
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
                    <button onClick={handleDelete} className={styles.deleteButton} disabled={loading}>
                        {loading ? 'Deleting...' : 'Yes, Delete'}
                    </button>
                    <button onClick={() => navigate(`/tasks/${id}`)} className={styles.cancelButton}>Cancel</button>
                </div>
                {error && <p className={styles.error}>Error deleting task: {error.message}</p>}
            </div>
        </div>
    );
};

export default DeleteTask;
