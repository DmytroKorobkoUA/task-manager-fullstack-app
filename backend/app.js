import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import messageRoutes from './routes/messages.js';
import sequelize from './config/database.js';
import Message from './models/message.js';

// Determine environment and load the corresponding .env file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Authorization'],
    },
    transports: ['websocket'],
});

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express API with PostgreSQL!');
});

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newMessage', async (messageData) => {
        try {
            const { userId, content, userName } = messageData;
            if (!userId || !content) {
                throw new Error('Missing userId or content');
            }

            const message = await Message.create({ userId, content });

            io.emit('message', {
                id: message.id,
                content: message.content,
                userId: message.userId,
                createdAt: message.createdAt,
                user: { id: message.userId, name: userName }
            });
        } catch (error) {
            console.error('Error handling newMessage event:', error);
        }
    });

    socket.on('deleteMessage', async (messageId) => {
        try {
            await Message.destroy({ where: { id: messageId } });
            io.emit('deleteMessage', messageId);
        } catch (error) {
            console.error('Error handling deleteMessage event:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
    server.listen(port, () => {
        console.log(`Server is running at ${process.env.FRONTEND_URL}:${port}`);
    });
});

export default app;
