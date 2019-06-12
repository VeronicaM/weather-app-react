import axios from 'axios';

// Services
import LoggerService from '../../services/logger.service.js';
import EndpointService from '../../services/endpoint.service.js';
import DateUtilsService from '../../services/dateUtils.service.js';

// local Variables
const filename = 'weather.service.js';

// get weather forecast from OpenWeather for given location params
const getForecast = (params) => {

    const onSuccess = (response) => {
        if (response && response.data && response.data.list) {
            // return every 3 hours temperature forecasts grouped by day 
            return processForecastData(response.data.list);
        }

        return onError('Wrong weather forecast JSON format!');
    };

    const onError = (error) => {
        // Send error to logging monitoring system
        LoggerService.log({
            message: error,
            type: LoggerService.MESSAGE_TYPES.ERROR,
            filename
        });
    };

    // get forecast endpoint with plugged in params
    const URL = EndpointService.buildURL(EndpointService.constants.FORECAST, params);

    return axios.get(URL)
        .then(onSuccess)
        .catch(onError);
};

/**
  * @input an array with all forecasted values data with all the info passed from OpenWeather
  * @output an array with forecasted time and temperatures data grouped by day 
  * [
  *	  {
		date: "Tue Jun 11 2019",
		values: [
			{
			   time:  "19:00",
			   temperature: "55"	
			},
			{
			   time:  "22:00",
			   temperature: "52"	
			},
		]
      },
	  ...
  * ]
*/

const processForecastData = (forecastItems) => {

    const groupByDay = (result, item) => {
        const day = DateUtilsService.getDateFromTimestamp(item.dt);
        const date = DateUtilsService.getDateString(item.dt);

        if (!result[day]) {
            result[day] = {
                date,
                values: []
            };
        }

        result[day].values = [...result[day].values, item];
        return result;
    };

    const getTimeTemperatures = (item) => {
        const time = DateUtilsService.getTimeFromTimestamp(item.dt);
        const temperature = item && item.main ? Math.round(item.main.temp) : 'N/A';

        return {
            dt: item.dt,
            temperature,
            time
        };
    };

    // group forecast data per day
    const groupedTemperatureValues = forecastItems.map(getTimeTemperatures).reduce(groupByDay, {});

    // return array with values for each date group
    return Object.values(groupedTemperatureValues);
};

export default {
    getForecast,
    processForecastData
};