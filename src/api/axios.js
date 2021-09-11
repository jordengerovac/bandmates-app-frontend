import axios from 'axios';
import store from '../store';
import { REFRESH_ACCESS_TOKEN } from '../actions/types';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        'Authorization': store.getState().authDetails.bandmates_access_token
    }
});

axios.interceptors.response.use(
    response => response,
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            const token = await fetchRefreshToken();
            
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          }

        return Promise.reject(error);
    }
)

async function fetchRefreshToken() {
    var token = ''
    await fetch('/api/v1/token/refresh', {
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Bearer ' + store.getState().authDetails.bandmates_refresh_token,
            'Content-Type': 'application/json',
        }), 
    })
    .then(response => response.json())
    .then(payload => {
        token = payload.access_token
        store.dispatch({
            type: REFRESH_ACCESS_TOKEN,
            payload: payload
        })
    })
    .catch(error => {
        console.log(error)
    })
    return token;
}

export default axiosInstance;