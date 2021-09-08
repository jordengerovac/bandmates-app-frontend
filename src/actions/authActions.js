import { FETCH_ACCESS_TOKEN, LOGOUT } from './types';
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
    .catch(function(error) {
        console.log(error);
    });
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}