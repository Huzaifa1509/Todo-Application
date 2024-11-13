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

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// const getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select("-password"); // Exclude password
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: "Server error" });
//     }
// };

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Check if the password matches
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Send the token to the client
//         res.json({ token });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update user
// const updateUser = async (req, res) => {
//     try {
//         const { email, username, password, name } = req.body;
//         const { id } = req.params;

//         // Check if email or username already exists for a different user
//         const existingUserEmail = await User.findOne({ email, _id: { $ne: id } });
//         const existingUserName = await User.findOne({ username, _id: { $ne: id } });

//         if (existingUserEmail || existingUserName) {
//             return res.status(409).json({ message: "Email or username already in use" });
//         }

//         // Validate email format using regex
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (email && !emailRegex.test(email)) {
//             return res.status(400).json({ message: "Invalid email format" });
//         }

//         // Validate name format (letters, spaces, hyphens only)
//         const nameRegex = /^[a-zA-Z\s-]+$/;
//         if (name && !nameRegex.test(name)) {
//             return res.status(400).json({ message: "Invalid name format. Only letters, spaces, and hyphens are allowed." });
//         }

//         // If password is being updated, validate and hash it
//         let hashedPassword;
//         if (password) {
//             if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
//                 return res.status(400).json({ message: "Password must be at least 8 characters long and contain both letters and numbers." });
//             }
//             hashedPassword = await bcrypt.hash(password, 10);
//         }

//         // Find the user and update
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user.name = name || user.name;
//         user.username = username || user.username;
//         user.email = email || user.email;
//         user.role = req.body.role || user.role;
//         user.status = req.body.status || user.status;
//         if (password) {
//             user.password = hashedPassword;
//         }

//         await user.save();
//         res.json(user);

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
// // Delete user
// const deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

module.exports = { createUser, getUsers};
