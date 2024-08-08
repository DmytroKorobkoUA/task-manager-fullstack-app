import Task from '../models/task.js';
import User from '../models/user.js';

const resolvers = {
    Query: {
        getAllTasks: async () => {
            try {
                return await Task.findAll({ include: { model: User, as: 'user' } });
            } catch (error) {
                throw new Error('Error fetching tasks: ' + error.message);
            }
        },
        getTaskById: async (_, { id }) => {
            try {
                const task = await Task.findByPk(id, { include: { model: User, as: 'user' } });
                if (!task) {
                    throw new Error('Task not found');
                }
                return task;
            } catch (error) {
                throw new Error('Error fetching task: ' + error.message);
            }
        },
    },
    Mutation: {
        createTask: async (_, { title, completed, userId }) => {
            try {
                const task = await Task.create({ title, completed, userId });
                return task;
            } catch (error) {
                throw new Error('Error creating task: ' + error.message);
            }
        },
        updateTask: async (_, { id, title, completed, userId }) => {
            try {
                const task = await Task.findByPk(id);
                if (!task) {
                    throw new Error('Task not found');
                }
                await task.update({ title, completed, userId });
                return task;
            } catch (error) {
                throw new Error('Error updating task: ' + error.message);
            }
        },
        deleteTask: async (_, { id }) => {
            try {
                const task = await Task.findByPk(id);
                if (!task) {
                    throw new Error('Task not found');
                }
                await task.destroy();
                return true;
            } catch (error) {
                throw new Error('Error deleting task: ' + error.message);
            }
        },
    },
};

export default resolvers;
