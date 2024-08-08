import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server-express';
import { Server } from 'socket.io';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import messageRoutes from './routes/messages.js';
import sequelize from './config/database.js';
import Message from './models/message.js';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';

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

// Apollo Server setup
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphql' });

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.send('Welcome to the Express API with PostgreSQL!');
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
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
        console.log(`GraphQL is available at ${process.env.FRONTEND_URL}:${port}${apolloServer.graphqlPath}`);
    });
});

export default app;
