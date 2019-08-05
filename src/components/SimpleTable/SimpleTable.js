import React, {PureComponent} from 'react';
import styled from 'styled-components';

import Thead from './Thead';
import Tbody from './Tbody';
import Tr from './Tr';
import Th from './Th';
import Td from './Td';

const DefaultTable = styled.table`
    border: 1px solid black;
`;

const getTh = (columns, onClick) => columns.map((x, i) => {
    return (
        <Th key={i} onClick={onClick.bind(this, x)}>
            {x.header}
        </Th>
    );
});

export default class SimpleTable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sorts: {},
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sorts !== this.state.sorts) {
            this.props.onSetSorts(this.state.sorts);
        }
    };

    onHandleClick = name => {
        const {sorts} = this.props;
        console.log(sorts)
        console.log(name)

        const newSorts = Object.keys(sorts).find(x => x === name.accessor) ?
            {[Object.keys(sorts).find(x => x === name.accessor)]:
                    Object.values(sorts).find(x => x === 'asc') ? 'desc' : 'asc'}
            : {[name.accessor]: 'asc'};

        this.setState({sorts: newSorts});
    };

    render() {
        const {rows, columns, total} = this.props;

        return (
            <DefaultTable>
                <Thead>
                    <Tr>{getTh(columns, this.onHandleClick)}</Tr>
                </Thead>
                <Tbody>
                    {rows.length > 0 ? (
                        rows.map((x, i) => (
                            <Tr key={i}>
                                <Td>{x.id}</Td>
                                <Td>{x.description}</Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td>Нет данных</Td>
                        </Tr>
                    )}
                    <Tr>
                        <Td>Всего записей: {total}</Td>
                    </Tr>
                </Tbody>
            </DefaultTable>
        );
    };
};