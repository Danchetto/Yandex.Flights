import * as React from 'react';

import './Filters.scss';

import { Grid, Checkbox, Input } from 'semantic-ui-react';


interface IProps {
    onChange?: any,
    search?: any
};

export default class Filters extends React.Component<IProps, any> {
    render() {
        const {search, onChange} = this.props;

        return(
            <div className="filters">
                <Grid>
                    <Grid.Row columns={5}>
                        <Grid.Column floated='left' width={4}>
                            <Input fluid onChange={search} icon="search" placeholder="Поиск по номеру рейса"/>
                        </Grid.Column>
                        <Grid.Column floated='left'>
                            <Checkbox slider defaultChecked value='arrival' onChange={onChange} label={{ children: 'Прилет' }}/>
                        </Grid.Column>
                        <Grid.Column floated='left'>
                            <Checkbox slider defaultChecked value='departure' onChange={onChange} label={{ children: 'Вылет' }}/>
                        </Grid.Column>
                        <Grid.Column floated='left'>
                            <Checkbox slider value='delay' onChange={onChange} label={{ children: 'Только задержанные рейсы' }}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
