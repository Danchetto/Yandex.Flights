import {combineReducers} from 'redux';
import flights from './flights/flights.reducer';

export default combineReducers(
    {
        flights
    }
);
