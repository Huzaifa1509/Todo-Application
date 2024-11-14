import axios from 'axios';

const API_URL_USERS = 'http://localhost:5000/api/users';
const API_URL_TODOS = 'http://localhost:5000/api/todos';

export const createUser = async (userData) => {
    return await axios.post(API_URL_USERS, userData);
};
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL_USERS}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.log("No authentication token found");
    }

    console.log("Sending request with token:", token);
    try {
        const response = await axios.get(`${API_URL_USERS}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response || error.message);
        console.log(error);
    }
};

export const createTodo = async (todoData) => {
    return await axios.post(API_URL_TODOS, todoData);
};
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL_TODOS}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        console.log(error);
    }
};

export const getTodos = async () => {
    try {
        const response = await axios.get(`${API_URL_TODOS}/alltodos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        console.log(error);
    }
};

export const deleteTodo = async (todoId) => {
    try {
        const response = await axios.delete(`${API_URL_TODOS}/${todoId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting todo:', error);
        console.log(error);
    }
}

export const updateTodo = async (todoId, updatedTodo) => {
    await axios.put(`${API_URL_TODOS}/${todoId}`, updatedTodo);
};