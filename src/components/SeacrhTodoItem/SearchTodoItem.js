import React, {PureComponent} from 'react';
import {
	item as itemApi,
} from '../../api/todos';

export default class SearchTodoItem extends PureComponent {
	constructor() {
		super();

		this.state = {
			id: null,
			data: null,
		};

		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	};

	// async componentDidMount() {
	// 	const result = await listApi();
	// 	this.setState({tableConfig: result});
	// };

	async onHandleSubmit (event) {
		event.preventDefault();
		const result = await itemApi(this.state.id);
		this.setState({tableConfig: result});
	};

	onHandleChange = event => {
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
					onChange={this.onHandleChange}
				/>
				<button type='submit'>Найти</button>
			</form>
		)
	};
};
