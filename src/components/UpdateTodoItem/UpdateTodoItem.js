import React, {PureComponent} from 'react';
import {
	update as updateApi
} from '../../api/todos';

export default class UpdateTodoItem extends PureComponent {
	constructor() {
		super();

		this.state = {
			todoId: null,
			todoTitle: null,
		};

		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	};

	async onHandleSubmit (event) {
		event.preventDefault();
		updateApi(this.state)
	};

	onHandleChange = event => {
		const value = event.target;
		this.setState({
			[value.name]: event.target.value,
		});
	};

	render() {
		console.log(this.state);
		return (
			<form onSubmit={this.onHandleSubmit}>
				<input
					type='text'
					name='todoId'
					placeholder='id'
					onChange={this.onHandleChange}
				/>
				<input
					type='text'
					name='todoTitle'
					placeholder='title'
					onChange={this.onHandleChange}
				/>
				<button type='submit'>Изменить</button>
			</form>
		)
	};
};
