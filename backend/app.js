import express from 'express';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import sequelize from './config/database.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express API with PostgreSQL!');
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});

export default app;
