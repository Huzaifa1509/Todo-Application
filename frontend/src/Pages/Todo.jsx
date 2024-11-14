import React, { useState, useEffect } from 'react';
import { createTodo, fetchCategories } from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        category: '',
        date: '',
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoryData = await fetchCategories(); 
                setCategories(categoryData);
            } catch (error) {
                toast.error('Failed to load categories');
            }
        };
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const titleRegex = /^[a-zA-Z\s-]+$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!titleRegex.test(taskData.title)) {
            return toast.error('Invalid title. Only letters, spaces, and hyphens are allowed.');
        }
        if (taskData.description.length < 10) {
            return toast.error('Description should be more than 10 characters.');
        }
        if (!taskData.date) {
            return toast.error('Please select a date.');
        }
        
        const selectedDate = new Date(taskData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today ) {
            return toast.error('Date cannot be in the past.');
        }

        try {
            await createTodo({ ...taskData });
            toast.success('Task created successfully!');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Task already added');
            } else {
                toast.error('Failed to create task');
            }
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Add New Task</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group mb-3">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter title"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter description"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="category">Category:</label>
                    <select
                        name="category"
                        value={taskData.category}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.category_name}>
                                {cat.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={taskData.date}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Task</button>
            </form>
        </div>
    );
};

export default Todo;
