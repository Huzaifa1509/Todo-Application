import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, updateTodo, fetchCategories } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todosData = await getTodos();
                setTodos(todosData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching todos:", err);
                setError("Failed to load todos");
                setLoading(false);
            }
        };

        const fetchCategory = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchTodos();
        fetchCategory();
    }, []);

    const handleFinish = async (todoId) => {
        if (window.confirm("Are you sure you want to finish this task?")) {
            try {
                await deleteTodo(todoId);
                setTodos(todos.filter((todo) => todo._id !== todoId));
            } catch (err) {
                console.error("Error deleting todo:", err);
                alert("Failed to delete todo");
            }
        }
    };

    const handleEdit = (todo) => {
        setSelectedTodo(todo);
        setUpdatedTitle(todo.title);
        setUpdatedDescription(todo.description);
        setUpdatedCategory(todo.category);
        setUpdatedDate(todo.date);
        setShowModal(true);
    };

    const handleSaveEdit = async () => {
        // Basic Validations
        if (updatedTitle.trim() === '') {
            toast.error("Title cannot be empty");
            return;
        }

        if (todos.some((todo) => todo.title === updatedTitle && todo._id !== selectedTodo._id)) {
            toast.error("Title already exists");
            return;
        }

        if (updatedDescription.trim().length < 10) {
            toast.error("Description must be at least 10 characters long");
            return;
        }
        if (new Date(updatedDate) < new Date().setHours(0, 0, 0, 0)) {
            toast.error("Date cannot be in the past");
            return;
        }

        const updatedTodo = {
            title: updatedTitle,
            description: updatedDescription,
            category: updatedCategory,
            date: updatedDate,
        };

        try {
            await updateTodo(selectedTodo._id, updatedTodo);
            setTodos(todos.map((todo) =>
                todo._id === selectedTodo._id ? { ...todo, ...updatedTodo } : todo
            ));
            setShowModal(false);
            toast.success("Todo updated successfully");
        } catch (err) {
            console.error("Error updating todo:", err);
            alert("Failed to update todo");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h2>All Todos</h2>
            <div className="row">
                {todos.map((todo) => (
                    <div key={todo._id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{todo.title}</h5>
                                <p className="card-text">{todo.description}</p>
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">{todo.date}</span>
                                    <span className="badge bg-primary">{todo.category}</span>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => handleEdit(todo)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleFinish(todo._id)}
                                >
                                    Finish
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">Edit Todo</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        value={updatedDescription}
                                        onChange={(e) => setUpdatedDescription(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select
                                        className="form-control"
                                        id="category"
                                        value={updatedCategory}
                                        onChange={(e) => setUpdatedCategory(e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <option key={category._id} value={category.category_name}>{category.category_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        value={updatedDate}
                                        onChange={(e) => setUpdatedDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default AllTodos;
