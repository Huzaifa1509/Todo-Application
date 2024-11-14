const Todo = require('../Models/Todo');
const TodoCategory = require('../Models/TodoCategory');
const createTodo = async (req, res) => {
    try {
        const { title, description, category, date } = req.body;
        const existingTitle = await Todo.findOne({ title });
        if (existingTitle) {
            return res.status(409).json({ message: 'Title already exists' });
        }
        const newTodo = new Todo({
            title,
            description,
            category,
            date
        });
        await newTodo.save();
        res.status(201).json({ message: 'Todo created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getCategories = async (req, res) => {
    try {
        const categories = await TodoCategory.find();
        res.status(200).json(categories);
        console.log(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        await Todo.findByIdAndDelete(todoId);
        res.status(200).json({ message: 'Todo finished successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const { title, description, category, date } = req.body;
        await Todo.findByIdAndUpdate(todoId, { title, description, category, date });
        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { createTodo, getCategories, getTodo, deleteTodo , updateTodo};
