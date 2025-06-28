const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Login user and set cookie
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email or password',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email or password',
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '10h',
        });

        // ✅ Set JWT token in HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // ✅ set to true in production (with HTTPS)
            maxAge: 10 * 60 * 60 * 1000, // 10 hours
        });

        console.log(`✅ User Logged In: ${user.email} (${user.role})`);

        res.status(200).json({
            success: true,
            message: 'Login successful',
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
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error while logging in',
        });
    }
};


// Logout and clear the JWT token
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // true in production
  });
  console.log(`✅ User Logged Out`);
  return res.json({ message: "Logout successful" });
};


module.exports = {
    loginUser,            // Login user route
    logoutUser            // Logout route
};