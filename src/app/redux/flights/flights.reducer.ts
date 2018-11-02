import {SET_FLIGHTS} from './flights.constants';

const initialState = {flights: []};

export default function flights(state = initialState, action) {
    switch (action.type) {
        case SET_FLIGHTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}