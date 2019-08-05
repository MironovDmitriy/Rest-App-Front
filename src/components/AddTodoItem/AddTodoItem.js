import React, {PureComponent} from 'react';
import {
	create as createApi,
} from '../../api/todos';

export default class AddTodoItem extends PureComponent {
	constructor() {
		super();

		this.state = {
			todoTitle: null,
		};

		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	};

	onHandleChange = event => {
		const value = event.target.value;
		this.setState({todoTitle: value})
	};

	async onHandleSubmit(event) {
		event.preventDefault();
		createApi(this.state.todoTitle);
	};

	render() {

		return (
			<form onSubmit={this.onHandleSubmit}>
				<input
					type='text'
					name='addTodo'
					onChange={this.onHandleChange}
				/>
				<button type='submit'>Добавить</button>
			</form>
		);
	};
};