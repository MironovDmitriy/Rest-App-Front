import fetch from 'isomorphic-fetch';

	const defaultOptions = {
		credentials: 'include',
		returnType: 'json',
	}

export default async (endpoint, addOptions = {}) => {
	const options = {
		...defaultOptions,
		...addOptions,
	}

	if (!options.headers) {
		options.headers = {}
	}

	let url = endpoint;

	if (options.qs) {
		const query = Object.keys(options.qs)
			.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(options.qs[k])}`)
			.join('&')
		url += `?${query}`
	}

	let response = await fetch(url, options);

	// if (!response.ok) {
	// 	const error = response;
	// 	const status = response.status;
	// 	const message = 'Что то пошло не так';

	// 	throw new HttpError(status, message);
	// }

	let result = response.json();
	return result;
};