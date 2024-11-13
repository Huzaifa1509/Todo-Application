import axios from 'axios';

const API_URL_USERS = 'http://localhost:5000/api/users';

export const getUsers = async () => {
    return await axios.get(API_URL_USERS);
};

export const createUser = async (userData) => {
    return await axios.post(API_URL_USERS, userData);
};