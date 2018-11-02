import * as React from 'react';

import './Main.scss';

import { Header } from 'semantic-ui-react';
import FTable from '../../components/FTable/FTable';
import Filters from '../../components/Filters/Filters';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as flightActions from '../../redux/flights/flights.actions';

interface IProps {
    flightActions? : any;
    flights? : any;
}

export interface IState {
    pageSize?: number,
    activePage?: number,
    arrival?: boolean,
    departure?: boolean,
    delay?: boolean,
    search?: string
}

class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            pageSize: 10,
            activePage: 1,
            arrival: true,
            departure: true,
            delay: false,
            search: ''
        };

        this.handlePaginate = this.handlePaginate.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
    }

    public componentWillMount(): void {
        this.update(this.state);
    }

    public handlePaginate(event, object) :void {
        this.setState({ activePage: Math.ceil(object.activePage) });
    }

    public update(newState: IState): void {
        this.setState({...newState, activePage: 1});
        this.props.flightActions.getFlights(newState);
    }

    public handleCheck(event, checkbox): void {
        const newState: IState = this.state;
        newState[checkbox.value] = checkbox.checked;
        this.update(newState);
    }

    public search(event, object): void {
        const newState: IState = this.state;
        newState['search'] = object.value;
        this.update(newState);
    }

    public render(): JSX.Element {
        const {flights}: any = this.props;

        const headers: Array<string> = ['Номер рейса','Статус', 'Город', 'Время вылета', 'Время прибытия', 'Задерживается'];

        return (
            <React.Fragment>
                <div className="header">
                    <Header className='header__data' size='huge' color='black'>Хогвартс. Расписание</Header>
                    <Header className='header__data' size='large' color='black'>Аэропорт 10 3/4</Header>
                </div>
                <div className="main">
                    <Filters onChange={this.handleCheck} search={this.search}/>
                    <FTable 
                        activePage={this.state.activePage}
                        pageSize={this.state.pageSize}
                        onPaginate={this.handlePaginate}
                        data={flights}
                        headers={headers}
                    />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps: any = (state: any) => {
    return {
        flights: state.flights.flights
    };
};

const mapDispatchToProps: any = (dispatch: any) => {
    return {
        flightActions: bindActionCreators(flightActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
