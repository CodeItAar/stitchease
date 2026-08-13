import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

export const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // This will return the user object upon success
};

export const register = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
};
