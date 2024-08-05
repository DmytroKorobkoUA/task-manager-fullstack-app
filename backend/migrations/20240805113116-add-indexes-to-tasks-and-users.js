export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addIndex('Users', ['name'], {
            name: 'idx_users_name',
        });

        await queryInterface.addIndex('Tasks', ['title'], {
            name: 'idx_tasks_title',
        });

        await queryInterface.addIndex('Tasks', ['completed'], {
            name: 'idx_tasks_completed',
        });

        await queryInterface.addIndex('Tasks', ['userId'], {
            name: 'idx_tasks_userId',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex('Users', 'idx_users_name');

        await queryInterface.removeIndex('Tasks', 'idx_tasks_title');

        await queryInterface.removeIndex('Tasks', 'idx_tasks_completed');

        await queryInterface.removeIndex('Tasks', 'idx_tasks_userId');
    },
};
