import React, {PureComponent, Fragment} from 'react';
import SearchTodoItem from '../components/SeacrhTodoItem';

export default class MainPage extends PureComponent {
	constructor() {
		super();
	};

	render() {
		return (
			<Fragment>
				<SearchTodoItem />
			</Fragment>
		)
	};
};