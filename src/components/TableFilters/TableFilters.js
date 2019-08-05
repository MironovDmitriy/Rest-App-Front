import React, {PureComponent} from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
    display: flex;
`;

const Container = styled.div`
    margin: 5px;
`;

const getFilterValue = (key, filters) => filters && key in filters ? filters[key] : '';

export default class TableFilters extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filtersValue: {},
        };

        this.onHandleChange = this.onHandleChange.bind(this);
    };

    componentDidUpdate(prevProps, prevState) {
        const {onChange} = this.props;
        if (prevState.filtersValue !== this.state.filtersValue) {
            onChange(this.state.filtersValue);
        }
    };

    onHandleChange = event => {
        const newFilters = {
            [event.target.name]: event.target.value
        };

        this.setState({filtersValue: newFilters})
    };

    render() {
        const {columns, filters} = this.props;

        return (
            <FiltersContainer>
                {columns && columns.map((x, i) => (
                    <Container key={i}>
                        <input
                            type='text'
                            placeholder={x.accessor}
                            name={x.accessor}
                            value={getFilterValue(x.accessor, filters)}
                            onChange={this.onHandleChange}
                        />
                    </Container>
                ))}
            </FiltersContainer>
        );
    };
};
