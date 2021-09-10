import axios from 'axios';
import { REGISTRATION_ATTEMPTED } from '../actions/types';
import store from '../store';

export const registerUser = async(firstname, lastname, username, password) => {
    try {
        const response = await axios.post('/api/v1/users/create', { 
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
            roles: [] 
        })
        return response;
    } catch (error) {
        const data = {
            type: REGISTRATION_ATTEMPTED,
            payload: true
        }
        store.dispatch(data)
        return Promise.reject(new Error(error));
    }
}

export const getQueriedUsers = async(query, token) => {
    try {
        const response = await axios.get('/api/v1/users/query/?search=' + '(firstname:\'*' + query + '*\' OR lastname:\'*' + query + '*\' OR username: \'*' + query + '*\')', { headers: {"Authorization" : `Bearer ${token}`} })
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const getUserProfile = async(username, token) => {
    try {
        const response = await axios.get('/api/v1/users/' + username + '/profiles', { headers: {"Authorization" : `Bearer ${token}`} })
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const getUser = async(username, token) => {
    try {
        const response = await axios.get('/api/v1/users/' + username, { headers: {"Authorization" : `Bearer ${token}`} })
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const updateUser = async(id, profile, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = axios.put('/api/v1/users/update/' + id, profile, config)
        return response
    } catch(error) {
        return Promise.reject(new Error(error));
    }
}