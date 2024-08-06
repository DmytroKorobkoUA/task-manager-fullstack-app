import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
});

Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });

export default Message;
