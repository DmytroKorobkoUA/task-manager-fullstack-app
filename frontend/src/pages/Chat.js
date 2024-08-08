import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Navbar from '../components/Navbar';
import styles from '../styles/Chat.module.css';
import { API_BASE_URL, BACKEND_BASE_URL } from '../config/apiConfig';

const Chat = React.memo(() => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const chatWindowRef = useRef(null);

    const links = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Home', to: '/' },
        { label: 'Users', to: '/users' },
        { label: 'Tasks', to: '/tasks' },
        { label: 'Logout', to: '/logout' },
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');

        const newSocket = io(BACKEND_BASE_URL, {
            transports: ['websocket'],
            auth: {
                token,
            },
        });

        setSocket(newSocket);

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/messages`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        newSocket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        newSocket.on('deleteMessage', (messageId) => {
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '' && socket) {
            const token = localStorage.getItem('token');
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.userId;
            const userName = decodedToken.userName;

            socket.emit('newMessage', { userId, content: newMessage, userName });
            setNewMessage('');
        }
    };

    const handleDeleteMessage = async (messageId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_BASE_URL}/messages/${messageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (socket) {
                socket.emit('deleteMessage', messageId);
            }
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const isAdmin = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).role === 'admin';

    return (
        <div className={styles.container}>
            <Navbar links={links} />
            <div className={styles.content}>
                <h1 className={styles.header}>Chat</h1>
                <div className={styles.chatWindow}>
                    <div className={styles.messagesContainer} ref={chatWindowRef}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`${styles.message} ${message.user.id === JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId ? styles.myMessage : styles.otherMessage}`}
                            >
                                <div className={styles.messageHeader}>
                                    <strong>{message.user.name || 'Unknown'}</strong>
                                    <span className={styles.timestamp}>{formatDate(message.createdAt)}</span>
                                </div>
                                <div className={styles.messageContent}>
                                    {message.content}
                                </div>
                                {(message.user.id === JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId || isAdmin) && (
                                    <button onClick={() => handleDeleteMessage(message.id)} className={styles.deleteButton}>
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        className={styles.input}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage} className={styles.sendButton}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Chat;
