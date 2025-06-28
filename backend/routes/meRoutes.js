const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

router.get("/me", ensureAuthenticated, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
            isActive: user.isActive,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin,
          },
    });
});

module.exports = router;
