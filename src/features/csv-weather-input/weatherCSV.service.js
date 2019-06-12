// Services
import WeatherService from '../forecast/weather.service.js';
import DateUtilsService from '../../services/dateUtils.service.js';

/*
 * @input csv forecast data in the format datetime, temperature(K)
 * @output processed forecast data grouped by day
 */
const parseForecastData = (csvForcastData) => {
    // get data in the format normally returned by open weather to pass it through the same process data frunction
    const timeTemperatureInput = csvForcastData.split('\n').map((forecastInput) => {
        const forecastValues = forecastInput.split(',');
        const dt = DateUtilsService.getTimestampFromString(forecastValues[0]);
        const temperature = forecastValues[1] ? Math.round(forecastValues[1]) : 'N/A';

        return {
            dt,
            main: { temp: temperature }
        }
    });

    const result = WeatherService.processForecastData(timeTemperatureInput);
    return result;
};

export default {
    parseForecastData
}
