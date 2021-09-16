import axios from 'axios';
import store from '../store';
import { axiosInstance } from '../api/axios'

export const createBOTBForUser = async(username, botb, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = axios.post('/api/v1/botb/users/create/' + username, botb, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}

export const getBOTBByUrlSlug = async(urlSlug, token) => {
    try {
        const response = await axios.get('/api/v1/botb/slug/' + urlSlug, { headers: {"Authorization" : `Bearer ${token}`} })
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}