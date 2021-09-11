import { FETCH_ACCESS_TOKEN, LOGOUT, LOGIN_ATTEMPTED, FETCH_SPOTIFY_TOKENS, REFRESH_ACCESS_TOKEN } from './types';
import axios from 'axios';
import { axiosInstance } from '../api/axios'

export const fetchAccessToken = (username, password) => dispatch => {
    var data = ''
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    axios.post('/api/v1/login', params)
    .then(res => {
        data = res.data
        dispatch({
            type: FETCH_ACCESS_TOKEN,
            payload: data
        });
    })
    .catch(error => {
        console.log(error);
        dispatch({
            type: LOGIN_ATTEMPTED,
            payload: true
        });
    })
}

export const refreshAccessToken = (refresh_token) => dispatch => {
    fetch('/api/v1/token/refresh', {
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Bearer ' + refresh_token
        }), 
    })
    .then(response => response.json())
    .then(payload => {
        dispatch({
            type: REFRESH_ACCESS_TOKEN,
            payload: payload
        });
    })
    .catch(error => {
        console.log(error)
    })
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

export const fetchSpotifyTokens = (payload) => dispatch => {
    dispatch({
        type: FETCH_SPOTIFY_TOKENS,
        payload: payload
    });
}