const ensureAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized. Please log in.' 
        });
    }
    next();
};

module.exports = ensureAuthenticated;