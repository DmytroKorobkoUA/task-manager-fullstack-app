import Task from '../models/task.js';
import client from '../redisClient.js';

export const getAllTasks = async (req, res) => {
    try {
        const cacheKey = 'tasks';
        const cachedData = await client.get(cacheKey);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const tasks = await Task.findAll();

        await client.set(cacheKey, JSON.stringify(tasks), {
            EX: 60,
        });

        return res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: error.message });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        client.del('tasks');

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);

            client.del('tasks');

            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();

            client.del('tasks');

            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
