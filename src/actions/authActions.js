import { FETCH_ACCESS_TOKEN, LOGOUT, LOGIN_ATTEMPTED, FETCH_SPOTIFY_TOKENS } from './types';
import axios from 'axios';

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