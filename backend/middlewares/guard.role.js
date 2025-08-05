
module.exports.guardRole = (...allowedRoles) => {

    return (req, res, next) => {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if the user's role is allowed
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
        }

        // Proceed to the next middleware or route handler
        next();
    };
}