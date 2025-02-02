
const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Access denied. You do not have permission.' });
    }
    next();
};

module.exports = checkRole;