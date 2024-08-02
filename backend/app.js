import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import sequelize from './config/database.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express API with PostgreSQL!');
});

const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at ${process.env.FRONTEND_URL}:${port}`);
    });
});

export default app;
