import APIConfig  from '../config/api.config.js';

const endpointUrls = {
	forecast: `https://api.openweathermap.org/data/2.5/forecast?lat=:lat&lon=:lon&appid=${APIConfig.openWeatherAPIKey}&units=imperial` 
};

const endpointNames =  {
	FORECAST: 'forecast'
};

const buildURL = (endpointName = '', params = {}) => {
	// return empty string if no endpoint name passed
	if(endpointName === '' ) return '';

	let urlWithParams = endpointUrls[endpointName]; 
	
	// replace params specified as :paramName in the endpoint URL with corresponding values
	Object.entries(params).forEach(([paramName, paramValue]) => {
		urlWithParams = urlWithParams.replace(`:${paramName}`, paramValue);
	});
	
	return urlWithParams;
};

export default {
	buildURL,
	constants: endpointNames
};