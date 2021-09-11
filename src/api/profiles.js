import axios from 'axios';
import store from '../store';
import { axiosInstance } from '../api/axios'

export const getProfileById = async(id, token) => {
    try {
        const response = await axios.get('/api/v1/profiles/' + id, { headers: {"Authorization" : `Bearer ${token}`} })
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const createProfileForUser = async(username, profile, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = axios.post('/api/v1/profiles/users/' + username, profile, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}

export const updateProfile = async(id, profile, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = axios.put('/api/v1/profiles/update/' + id, profile, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}