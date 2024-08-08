import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Импортируем Axios
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASK, UPDATE_TASK, GET_TASKS } from '../../graphql/taskQueries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    const { loading: taskLoading, error: taskError, data: taskData } = useQuery(GET_TASK, {
        variables: { id },
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    });

    useEffect(() => {
        if (taskData) {
            setTitle(taskData.getTaskById.title);
            setCompleted(taskData.getTaskById.completed);

            if (taskData.getTaskById.user) {
                setSelectedUser(taskData.getTaskById.user.id);
            }
        }
    }, [taskData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask({
                variables: { id, title, completed, userId: selectedUser },
            });
            navigate('/tasks');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Chat', to: '/chat' },
        { label: 'Logout', to: '/logout' },
    ];

    if (taskLoading) return <p>Loading...</p>;
    if (taskError) return <p>Error fetching task: {taskError.message}</p>;

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Update Task</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>
                            Completed
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={(e) => setCompleted(e.target.checked)}
                                className={styles.formCheckbox}
                            />
                        </label>
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.formLabel}>Assign User</label>
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            required
                            className={styles.formSelect}
                        >
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className={styles.formButton}>
                        Update Task
                    </button>
                </form>
                <Link to="/tasks" className={styles.backLink}>
                    Back to Tasks
                </Link>
            </div>
        </div>
    );
};

export default UpdateTask;
