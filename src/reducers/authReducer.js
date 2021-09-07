import { FETCH_ACCESS_TOKEN } from '../actions/types';


const initialState = {
    access_token: '',
    refresh_token: '',
    authenticated: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_ACCESS_TOKEN:
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                authenticated: true
            }
        default:
            return state;
    }
}