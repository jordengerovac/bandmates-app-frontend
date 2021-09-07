import { FETCH_ACCESS_TOKEN } from './types';
import axios from 'axios';

export const fetchAccessToken = (username, password) => dispatch => {
    var access_token = ''
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    axios.post('/api/v1/login', params)
    .then(res => {
        access_token = res.data.access_token
        dispatch({
            type: FETCH_ACCESS_TOKEN,
            payload: access_token
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}