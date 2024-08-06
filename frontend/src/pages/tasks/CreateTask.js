import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Tasks.module.css';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${API_BASE_URL}/tasks`,
                { title, completed, userId: selectedUser },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigate('/tasks');
        } catch (error) {
            console.error('Error creating task:', error);
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
                        <label className={styles.formLabel}>User</label>
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            required
                            className={styles.formSelect}
                        >
                            <option value="">Select a User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Create Task
                    </button>
                </form>
                <div className={styles.linkWrapper}>
                    <Link to="/tasks" className={styles.link}>
                        Back to Tasks
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
