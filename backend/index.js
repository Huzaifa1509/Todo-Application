require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/db');
const cors = require("cors");
const userController = require('./Controllers/userController');
const todoController = require('./Controllers/todoController');
const protect = require('./Middlewares/RouteProtect');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions));
app.use(express.json());
connectDB();

////////// User k routes
app.post('/api/users', userController.createUser);
app.post('/api/users/login', userController.loginUser);
app.get('/api/users/profile', protect, userController.getProfile);

////////// Todo k routes
app.get('/api/todos', todoController.getTodo);
app.post('/api/todos', todoController.createTodo); 
app.get('/api/todos/alltodos', todoController.getTodo);
app.delete('/api/todos/:id', todoController.deleteTodo);
app.put('/api/todos/:id', todoController.updateTodo);
app.get('/api/todos/categories', todoController.getCategories);  


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
