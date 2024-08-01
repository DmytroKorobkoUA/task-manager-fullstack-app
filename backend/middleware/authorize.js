const authorize = (requiredRole) => {
    return (req, res, next) => {
        const { user } = req;

        if (user && user.role === requiredRole) {
            return next();
        }

        return res.status(403).json({ message: 'Access denied' });
    };
};

export default authorize;
