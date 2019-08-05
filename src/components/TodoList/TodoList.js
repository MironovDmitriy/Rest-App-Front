import React, {PureComponent} from 'react';
import styled from 'styled-components';
import debounce from 'debounce';
import {columns} from '../../constants/table-config/simple-table-config';
import {
    listTable as listTableApi
} from "../../api/todos";

import SimpleTable from '../SimpleTable';
import TableFilters from '../TableFilters';
import RowCount from '../RowCount';
import Pagination from '../Pagination';

const Container = styled.div`
`;

export const ROW_COUNT = 3;
export const CURRENT = 1;

export default class TodoList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tableConfig: {
                current: CURRENT,
                rowCount: ROW_COUNT,
                filters: {},
                sorts: {id: "desc"},
                rows: [],
                total: 0,
            },
        };

        this.onFiltersChange = this.onFiltersChange.bind(this);
        this.onHandleSorts = this.onHandleSorts.bind(this);
        this.onRowCountChange = this.onRowCountChange.bind(this);
        this.onClickNumber = this.onClickNumber.bind(this);
    };

    async componentDidMount() {
        const {tableConfig} = this.state;

        const result = await listTableApi(tableConfig);
        const newState = {...tableConfig, ...result};
        this.setState({tableConfig: newState});
    };

    async componentDidUpdate(prevProps, prevState) {
        const {tableConfig} = this.state;

        if (prevState.tableConfig.filters !== tableConfig.filters) {
            this.debouncedDataRequest({
                ...tableConfig,
                current: 1,
            });
        }

        if (prevState.tableConfig.sorts !== tableConfig.sorts) {
            this.dataRequest({
                ...tableConfig,
                current: 1,
            });
        }

        if (prevState.tableConfig.rowCount !== tableConfig.rowCount) {
            this.dataRequest(tableConfig);
        }

        if (prevState.tableConfig.current !== tableConfig.current) {
            this.dataRequest(tableConfig);
        }
    };

    async dataRequest(data) {
        const {tableConfig} = this.state;

        // const result = await listTableApi(tableConfig);
        const result = await listTableApi(data);
        const newState = {...tableConfig, ...result};
        this.setState({tableConfig: newState});
    };

    debouncedDataRequest = debounce(this.dataRequest, 1000);

    onFiltersChange(newFilters) {
        const {tableConfig} = this.state;

        const newState = {
            ...tableConfig,
        filters: {
            ...tableConfig.filters,
            [Object.keys(newFilters).map(x => x)]: Object.values(newFilters).map(x => x)[0],
        },
        };

        this.setState({tableConfig: newState});
    };

    onHandleSorts(newSorts) {
        const {tableConfig} = this.state;

        const newState = {
            ...tableConfig,
            sorts: newSorts,
        };

        this.setState({tableConfig: newState});
    };

    onRowCountChange(newRowCount) {
        const {tableConfig} = this.state;

        const newState = {
            ...tableConfig,
            rowCount: newRowCount,
        };
        this.setState({tableConfig: newState});
    };

    onClickNumber(newPageNumber) {
        const {tableConfig} = this.state;

        const newState = {
            ...tableConfig,
            current: newPageNumber,
        };
        console.log(newState)
        this.setState({tableConfig: newState});
    };

    render() {
        const {tableConfig} = this.state;

        return(
            <Container>
                <TableFilters
                    columns={columns}
                    filters={tableConfig.filters}
                    onChange={this.onFiltersChange}
                />
                <SimpleTable
                    columns={columns}
                    sorts={tableConfig.sorts}
                    rows={tableConfig.rows}
                    total={tableConfig.total}
                    onSetSorts={this.onHandleSorts}
                />
                <RowCount
                    rowCount={tableConfig.rowCount}
                    onChange={this.onRowCountChange}
                />
                <Pagination
                    current={tableConfig.current}
                    onChange={this.onClickNumber}
                    total={tableConfig.total}
                    rowCount={tableConfig.rowCount}
                />
            </Container>
        );
    };
};