require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/db');
const cors = require("cors");
const userController = require('./Controllers/userController');

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type"], 
};

app.use(cors(corsOptions));
app.use(express.json());
connectDB();

app.post('/api/users', userController.createUser);
app.get('/api/users', userController.getUsers);
// app.get('/api/users/:id', userController.getUserById);
// app.put('/api/users/:id', userController.updateUser);
// app.delete('/api/users/:id', userController.deleteUser);
// app.post('/api/users/login', userController.loginUser);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
