import { FETCH_ACCESS_TOKEN } from '../actions/types';


const initialState = {
    access_token: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_ACCESS_TOKEN:
            return {
                ...state,
                access_token: action.payload
            }
        default:
            return state;
    }
}