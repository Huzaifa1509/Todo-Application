const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    try {
        const { email, age, password, name } = req.body;
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(409).json({ message: "Email already in use" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (age <= 5) {
            return res.status(400).json({ message: "Age must more than 5." });
        }
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long and contain both letters and numbers." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            age,
            password: hashedPassword
        });

        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const PasswordValid = await bcrypt.compare(password, user.password);
        if (!PasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            name: user.name,
            email: user.email,
            age: user.age,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { createUser, loginUser, getProfile };
