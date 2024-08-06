import bcrypt from 'bcrypt';

export default {
    up: async (queryInterface) => {
        // Create Admin
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);
        const admin = await queryInterface.bulkInsert('Users', [{
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedAdminPassword,
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        }], { returning: true });

        // Create User
        const hashedUserPassword = await bcrypt.hash('user123', 10);
        const user = await queryInterface.bulkInsert('Users', [{
            name: 'Regular User',
            email: 'user@example.com',
            password: hashedUserPassword,
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
        }], { returning: true });

        // Create tasks
        await queryInterface.bulkInsert('Tasks', [
            { title: 'Task 1', completed: false, userId: user[0].id, createdAt: new Date(), updatedAt: new Date() },
            { title: 'Task 2', completed: true, userId: user[0].id, createdAt: new Date(), updatedAt: new Date() },
            { title: 'Task 3', completed: false, userId: user[0].id, createdAt: new Date(), updatedAt: new Date() }
        ]);

        // Create messages
        await queryInterface.bulkInsert('Messages', [
            { content: 'Hello!', userId: admin[0].id, createdAt: new Date(), updatedAt: new Date() },
            { content: 'Nice to meet you here!', userId: admin[0].id, createdAt: new Date(), updatedAt: new Date() }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Tasks', null, {});
        await queryInterface.bulkDelete('Users', null, {});
    }
};
