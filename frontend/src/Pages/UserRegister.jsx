import React, { useState } from 'react';
import { createUser } from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        age: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s-]+$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.name && !nameRegex.test(userData.name)) {
            return toast.error('Invalid name. Only letters, spaces, and hyphens are allowed.');
        }
        if (userData.email && !emailRegex.test(userData.email)) {
            return toast.error('Invalid email format.');
        }
        if (userData.password.length < 8 || !/\d/.test(userData.password) || !/[a-zA-Z]/.test(userData.password)) {
            return toast.error('Password must be at least 8 characters long and contain both letters and numbers.');
        }
        if (userData.age <= 5){
            return toast.error('Age must be more than 5.');
        }

        try {
            await createUser({ ...userData});
            toast.success('User created successfully!');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Email already in use');
            } else {
                toast.error('Failed to create user');
            }
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group mb-3">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter name"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={userData.age}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter age"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
        </div>
    );
};

export default UserRegister;
