import React, {PureComponent} from 'react';
import {
    remove as removeApi,
} from '../../api/todos';

export default class RemoveTodoItem extends PureComponent {
    constructor() {
        super();

        this.state = {
            id: null,
            data: null,
        };

        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    };

    async onHandleSubmit (event) {
        event.preventDefault();
        const result = await removeApi(this.state.id);
        this.setState({data: result});
    };

    onHandleChange = event => {
        const value = event.target.value;
        const newState = {
            ...this.state,
            id: value,
        };
        this.setState(newState);
    };

    render() {
        return (
            <form onSubmit={this.onHandleSubmit}>
                <input
                    type='text'
                    name='removeTodo'
                    onChange={this.onHandleChange}
                />
                <button type='submit'>Удалить</button>
            </form>
        )
    };
};