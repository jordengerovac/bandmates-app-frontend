import { FETCH_ACCESS_TOKEN, LOGIN_ATTEMPTED, LOGOUT, REGISTRATION_ATTEMPTED } from '../actions/types';


const initialState = {
    access_token: '',
    refresh_token: '',
    authenticated: false,
    invalid_login: false,
    invalid_registration: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_ACCESS_TOKEN:
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                username: action.payload.username,
                authenticated: true,
                invalid_login: false
            }
        case LOGOUT:
            return {
                ...state,
                access_token: '',
                refresh_token: '',
                username: '',
                authenticated: false
            }
        case LOGIN_ATTEMPTED:
            return {
                ...state,
                invalid_login: action.payload
            }
        case REGISTRATION_ATTEMPTED:
            return {
                ...state,
                invalid_registration: action.payload
            }
        default:
            return state;
    }
}