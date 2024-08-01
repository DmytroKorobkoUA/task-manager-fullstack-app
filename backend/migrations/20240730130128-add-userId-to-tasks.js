import { DataTypes } from 'sequelize';

export default {
    up: async (queryInterface) => {
        await queryInterface.addColumn('Tasks', 'userId', {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('Tasks', 'userId');
    },
};
