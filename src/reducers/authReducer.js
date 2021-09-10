import { FETCH_ACCESS_TOKEN, LOGIN_ATTEMPTED, LOGOUT, REGISTRATION_ATTEMPTED, FETCH_SPOTIFY_TOKENS } from '../actions/types';


const initialState = {
    bandmates_access_token: '',
    bandmates_refresh_token: '',
    spotify_access_token: '',
    spotify_refresh_token: '',
    authenticated: false,
    invalid_login: false,
    invalid_registration: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_ACCESS_TOKEN:
            return {
                ...state,
                bandmates_access_token: action.payload.access_token,
                bandmates_refresh_token: action.payload.refresh_token,
                username: action.payload.username,
                authenticated: true,
                invalid_login: false
            }
        case LOGOUT:
            return {
                ...state,
                bandmates_access_token: '',
                bandmates_refresh_token: '',
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
        case FETCH_SPOTIFY_TOKENS:
            return {
                ...state,
                spotify_access_token: action.payload.access_token,
                spotify_refresh_token: action.payload.refresh_token
            }
        default:
            return state;
    }
}