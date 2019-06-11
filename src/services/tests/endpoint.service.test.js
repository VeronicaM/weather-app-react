import EndpointService from '../endpoint.service.js';

it('should return empty value if no endpoint name present', () => {
  	const url = EndpointService.buildURL();
  	expect(url).toBe('');
});

it('should plug params values in given existing endpoint', () => {
  	const url = EndpointService.buildURL(EndpointService.constants.FORECAST, { lat: '20', lon: '21'});
  	const containsParams = url.indexOf('lat=20') > -1 && url.indexOf('lon=21') > -1;

  	expect(containsParams).toBe(true);
});