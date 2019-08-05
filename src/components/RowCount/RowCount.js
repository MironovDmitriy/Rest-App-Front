import React, {PureComponent} from 'react';
import styled from 'styled-components';

const TextContainer = styled.button`
    margin: 3px;
    cursor: pointer;
    border: none;
    background-color: white;
    font-weight: ${props => props.selected ? `bold` : `normal`};
    color: ${props => props.selected ? 'red' : 'black'};
`;

const getSelectedRowCount = (selected, key) => key === selected;

export default class RowCount extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowCount: this.props.rowCount,
        };

        this.onHandleClick = this.onHandleClick.bind(this);
    };

    static defaultProps = {
        rowCounts: [3, 4, 5],
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedRowCount !== this.state.selectedRowCount) {
            this.props.onChange(this.state.selectedRowCount);
        }
    };

    onHandleClick = event => this.setState({selectedRowCount: Number(event.target.name)});

    render() {
        const {selectedRowCount} = this.state;

        return (
            this.props.rowCounts.map((x, i) => (
                <TextContainer
                    key={i}
                    name={x}
                    selected={getSelectedRowCount(selectedRowCount, x)}
                    onClick={this.onHandleClick}
                >
                    {x}
                </TextContainer>
            ))
        );
    };
};