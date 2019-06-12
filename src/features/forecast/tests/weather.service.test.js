 // get the mocked version of axios
 import mockAxios from 'axios';
 import WeatherService from '../weather.service.js';
 import EndpointService from '../../../services/endpoint.service.js';
 import mockForecast from '../../../__mocks__/forecast.mock.js';

 beforeEach(() => {
     mockAxios.get.mockImplementation(() => Promise.resolve(mockForecast.forecast));
 });

 it('should request forecast data from forecast endpoint', () => {

     const params = { lat: 20, lon: 21 };

     WeatherService.getForecast(params);
     //forecast endpoint with plugged in params
     const URL = EndpointService.buildURL(EndpointService.constants.FORECAST, params);

     expect(mockAxios.get).toHaveBeenCalledTimes(1);
     expect(mockAxios.get).toHaveBeenCalledWith(URL);
 });

 it('should return forecast as an array of times and temperatures grouped by day', async () => {
     const params = { lat: 20, lon: 21 };
     const forecastData = await WeatherService.getForecast(params);
     expect(forecastData).toEqual(mockForecast.proccessedForecastData);
 });

 it('should throw error if endpoint data format is wrong', async () => {
     mockAxios.get.mockImplementation(() => Promise.resolve({
         data: {}
     }));

     const params = { lat: 20, lon: 21 };

     try {
         const forecastData = await WeatherService.getForecast(params);
     } catch (ex) {
         expect(ex).not.toBe(undefined);
     }
 });