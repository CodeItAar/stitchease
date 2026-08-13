import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/designs';

export const getAllDesigns = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const getFilteredDesigns = async (filters) => {
    const response = await axios.get(`${API_BASE_URL}/filter`, { params: filters });
    return response.data;
};

export const createDesign = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateDesign = async (id, designData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, designData);
    return response.data;
};

export const deleteDesign = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};