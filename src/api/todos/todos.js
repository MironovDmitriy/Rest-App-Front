import apiRequest from '../api-request.js';

export const list = async () => {
	const result = await apiRequest(`/list`, {
		method: 'GET',
	});

	return result;
};

export const item = async id => {
	const result = await apiRequest(`/${id}`, {
		method: 'GET',
	});

	return result;
};

export const create = async data => {
	const result = await apiRequest(`/todo`, {
		method: 'POST',
		json: {description: data},
	})

	return result;
};

export const update = async data => {
	const result = await apiRequest(`/${data.todoId}`, {
		method: 'PUT',
		json: {
			description: data.todoTitle,
		},
	})

	return result;
};

export const remove = async id => {
	const result = await apiRequest(`/${id}`, {
		method: 'DELETE',
	});

	return result;
};