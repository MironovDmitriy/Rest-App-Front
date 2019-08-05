import React, {PureComponent} from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
    margin: 5px;
    cursor: pointer;
    font-weight: ${props => props.selected ? 'bold' : 'normal'};
    color: ${props => props.selected ? 'red' : 'black'};
`;

export default class Pagination extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedPage: 1,
        };

        this.onBackPage = this.onBackPage.bind(this);
        this.onForwardPage = this.onForwardPage.bind(this);
    };

    componentDidUpdate(prevProps, prevState) {
        const {selectedPage} = this.state;

        if (prevState.selectedPage !== selectedPage) {
            this.props.onChange(selectedPage);
        }
    };

    onHandleClick = event => this.setState({selectedPage: Number(event.target.name)});

    onBackPage() {
        const {selectedPage} = this.state;

        const newState = {
            ...this.state,
            selectedPage: selectedPage - 1 > 0 ? selectedPage - 1 : 1
        };

        this.setState(newState);
    };

    onForwardPage() {
        const {selectedPage} = this.state;
        const {total, rowCount} = this.props;

        const newState = {
            ...this.state,
            selectedPage: selectedPage + 1 > Math.ceil(total/rowCount) ?
                Math.ceil(total/rowCount) : selectedPage + 1,
        };

        this.setState(newState);
    };

    getPagesSet = () => {
        const pagesCount = Math.ceil(this.props.total/this.props.rowCount);
        let pagesSet = [];

        for (let i = 1; i <= pagesCount; i++) {
            pagesSet.push(i);
        }

        return pagesSet;
    };

    render() {
        const {current} = this.props;

        return (
            <div>
                <ButtonContainer
                    onClick={this.onBackPage}
                >
                    {'<'}
                </ButtonContainer>
                <span>
                    {this.getPagesSet().map((x, i) => {
                        return (
                            <ButtonContainer
                                key={i}
                                selected={x === current}
                                onClick={this.onHandleClick}
                                name={x}
                            >
                                {x}
                            </ButtonContainer>
                        )}
                    )}
                </span>
                <ButtonContainer
                    onClick={this.onForwardPage}
                >
                    {'>'}
                </ButtonContainer>
            </div>
        );
    };
};