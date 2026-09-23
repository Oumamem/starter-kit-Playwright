
import axios, { AxiosRequestConfig } from 'axios';
import { ProjectSettings } from '../../setup/ProjectSettings';

async function performRequestWithBody(method:string, requestedRoute: string, requestBody: any) {
	const domainAPI = ProjectSettings.API_DIOR_DOMAIN();
	const url = `http://${domainAPI}/${requestedRoute}`;
  	let config: AxiosRequestConfig = {
		method: method,
		maxBodyLength: Infinity,
		url: url,
		headers: {
            'Content-Type': 'application/json',
		},
		data: requestBody,
	};

  	let response = await axios.request(config);
    try {
    	return response.data;
    } catch (error: any) {
		throw new Error(`Call to ${method} on '${requestedRoute}' is not successful: ${response.status} ${response.data}`);
    }
}

async function performPostRequest(route, body) {
	return await performRequestWithBody('POST', route, body);
}

async function performGetRequest(route, body) {
	return await performRequestWithBody('GET', route, body);
}

async function performDeleteRequest(route, body) {
	return await performRequestWithBody('DELETE', route, body);
}

export { performRequestWithBody, performPostRequest, performGetRequest, performDeleteRequest};