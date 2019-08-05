import React, {PureComponent, Fragment} from 'react';
import SearchTodoItem from '../components/SeacrhTodoItem';
import AddTodoItem from '../components/AddTodoItem';
import UpdateTodoItem from '../components/UpdateTodoItem';
import RemoveTodoItem from '../components/RemoveTodoItem';
import TodoList from "../components/TodoList/TodoList";

export default class MainPage extends PureComponent {
	render() {
		return (
			<Fragment>
				<SearchTodoItem />
				<br />
				<AddTodoItem />
				<br />
				<UpdateTodoItem />
				<br />
				<RemoveTodoItem />
				<br />
				<TodoList />
			</Fragment>
		)
	};
};