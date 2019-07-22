import React, {PureComponent} from 'react';
import {item as itemApi} from '../../api/todos';

export default class SearchTodoItem extends PureComponent {
	constructor() {
		super();

		this.state = {
			id: null,
		};
	};

	onHandleSubmit = event => {
		event.preventDefault();
		itemApi(this.state.id);
	};

	onHadleChange = event => {
		const value = event.target.value;
		const newState = {
			...this.state,
			id: value,
		}
		this.setState(newState);
	};

	render() {
		return (
			<form onSubmit={this.onHandleSubmit}>
				<input
					type='text'
					name='searchTodo'
					onChange={this.onHadleChange}
				/>
				<button type='submit'>Найти</button>
			</form>
		)
	};
};
