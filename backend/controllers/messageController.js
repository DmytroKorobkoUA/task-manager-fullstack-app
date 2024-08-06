import Message from '../models/message.js';
import User from '../models/user.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
            order: [['createdAt', 'ASC']],
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMessage = async (userId, content) => {
    try {
        const message = await Message.create({
            userId,
            content,
        });
        return message;
    } catch (error) {
        throw new Error('Error creating message: ' + error.message);
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const userId = req.user.userId;

        const message = await Message.findByPk(messageId);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin' || message.userId === userId) {
            await message.destroy();
            return res.status(200).json({ message: 'Message deleted successfully' });
        }

        return res.status(403).json({ message: 'You do not have permission to delete this message' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
