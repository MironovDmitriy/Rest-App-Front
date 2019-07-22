import apiRequest from '../api-request.js';
import {localUrl} from '../../constants/paths/paths.js';

export const item = async id => {
	const result = await apiRequest(localUrl, {
		method: 'GET',
		qs: {id},
	})

	return result;
}