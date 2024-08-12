import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { CREATE_TASK, GET_TASKS } from '../../graphql/taskQueries';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';
import DOMPurify from 'dompurify';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorUsers, setErrorUsers] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                setUsers(response.data);
            } catch (error) {
                setErrorUsers('Error fetching users.');
                console.error('Error fetching users:', error);
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsers();
    }, []);

    const [createTask, { error: createTaskError }] = useMutation(CREATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
        onError: (error) => {
            console.error('Error creating task:', error);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sanitizedTitle = DOMPurify.sanitize(title);

        try {
            await createTask({
                variables: { title: sanitizedTitle, completed, userId: selectedUser },
            });
            navigate('/tasks');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Chat', to: '/chat' },
        { label: 'Logout', to: '/logout' },
    ];

    if (loadingUsers) return <p>Loading users...</p>;
    if (errorUsers) return <p>{errorUsers}</p>;

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Create New Task</h1>
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
                        Create Task
                    </button>
                </form>
                {createTaskError && <p>Error creating task: {createTaskError.message}</p>}
                <Link to="/tasks" className={styles.backLink}>
                    Back to Tasks
                </Link>
            </div>
        </div>
    );
};

export default CreateTask;
