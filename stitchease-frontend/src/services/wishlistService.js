import axios from 'axios';

const API_URL = 'http://localhost:8080/api/wishlist';

export const getWishlist = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist", error);
        throw error;
    }
};

export const addToWishlist = async (userId, designId) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/add/${designId}`);
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist", error);
        throw error;
    }
};

export const removeFromWishlist = async (userId, designId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}/remove/${designId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing from wishlist", error);
        throw error;
    }
};
