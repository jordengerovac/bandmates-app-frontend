import axios from 'axios';
import store from '../store';

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