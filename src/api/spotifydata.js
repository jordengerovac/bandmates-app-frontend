import axios from 'axios';
import store from '../store';
import { axiosInstance } from '../api/axios'

export const initializeSpotify = async(username, code, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('/api/v1/spotifydata/initialize/' + username + '?code=' + code, {}, config);
        return response;

    } catch (error) {
        return Promise.reject(new Error(error));
    }
}

export const fetchSpotifyData = async(username, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('api/v1/spotifydata/fetch/' + username, config);
        return response;
    } catch (error) {
        return Promise.reject(new Error(error));
    }
}