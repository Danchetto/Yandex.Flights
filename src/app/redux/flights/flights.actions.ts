import {SET_FLIGHTS} from './flights.constants';
import transport from '../../modules/Transport/Transport';
import {GET_FLIGHTS} from '../../constants/HttpConstants';
import {IState} from '../../containers/Main/Main';

export function getFlights(filters: IState, flights: Array<any>) {
    console.log('filters: ', filters);
    return async (dispatch) => {

        const response = await transport.doGet(GET_FLIGHTS);
        let checkedSearch = await response.json();


        if (filters.search) {
            checkedSearch = checkedSearch.filter((item) => {
                return item.number.includes(filters.search);
            });
        }    

        const newData: Array<any> = checkedSearch.filter((item) => {
            if (!filters.arrival && !filters.departure) {
                return false;
            }
            if (!filters.delay) {
                return item.status === filters.arrival || item.status === !filters.departure;
            }
            return item.delay && (item.status === filters.arrival || item.status === !filters.departure);
        });

        console.log('NEW: ', newData);

        dispatch(setFlights(newData));
    };
}

export function setFlights(data) {
    return {
        type: SET_FLIGHTS,
        payload: {flights: data}
    };
}
