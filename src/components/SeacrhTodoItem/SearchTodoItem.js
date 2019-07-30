import React, {PureComponent} from 'react';
import {
	item as itemApi,
	list as listApi,
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

	async componentDidMount() {
		const result = await listApi();
		this.setState({data: result});
	};

	async onHandleSubmit (event) {
		event.preventDefault();
		const result = await itemApi(this.state.id);
		this.setState({data: result});
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
		const {data} = this.state;
		data && data.message ? console.log(data.message) : console.log(data);

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
