import * as React from 'react';

import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, Pagination } from 'semantic-ui-react';

import './FTable.scss';

interface IProps {
    onPaginate?: any,
    data?: any,
    pageSize?: any,
    activePage?: any,
    headers?: any
};

export default class FTable extends React.Component<IProps, any> {
    render() {
        const {onPaginate, data, pageSize, headers, activePage} = this.props;

        return(
            <div className='table'>
                <Table selectable celled>
                    <TableHeader>
                        <TableRow>
                            {headers.length ? headers.map((item, key) => {
                                return(<TableHeaderCell textAlign='center' key={key}>{item}</TableHeaderCell>);
                            }) : null}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {data.length ? data.map((item: any, key: number) => {
                            if (key >= (activePage - 1) * pageSize && key <= activePage * pageSize - 1) {
                                    return(<Table.Row key={key} textAlign='center'>
                                                <Table.Cell>{item.number}</Table.Cell>
                                                <Table.Cell>{item.status ? 'Прилет' : 'Вылет'}</Table.Cell>
                                                <Table.Cell>{item.destination}</Table.Cell>
                                                <Table.Cell>{item.departureTime}</Table.Cell>
                                                <Table.Cell>{item.arrivalTime}</Table.Cell>
                                                <Table.Cell>{item.delay ? 'Да' : 'Нет'}</Table.Cell>
                                            </Table.Row>
                                    );
                            }
                        }) 
                        : null}
                    </TableBody>
                </Table>
                <Pagination
                    boundaryRange={0} 
                    totalPages={data.length / pageSize}
                    activePage={activePage}
                    onPageChange={onPaginate}
                    pointing
                    secondary
                    firstItem={null}
                    lastItem={null}
                />
            </div>
        );
    }
}
