import React, { Fragment, Component } from 'react';

// Material UI Components
import Typography from '@material-ui/core/Typography';

// Components
import WeatherTable from '../forecast/ForecastTable.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';

// Services
import WeatherService from '../forecast/weather.service.js';

// variables 
const defaultCity = {
    lat: '51.5074',
    lon: '-0.118092',
    name: 'London'
};

const defaultState = {
    daysForecast: [],
    lat: defaultCity.lat,
    lon: defaultCity.lon,
    isLoading: true,
    error: false,
    cityName: defaultCity.name
};

class WeatherDashboard extends Component {

    constructor(props) {
        super(props);
        // initialize state with default values 
        this.state = defaultState;

        // Keep track of component mounted state
        this.hasMounted = false;
    }

    componentDidMount() {
        this.hasMounted = true;
        this.getWeatherForecast();
    }

    componentWillUnmount() {
        this.hasMounted = false;
    }

    getWeatherForecast = () => {
        const onError = (error) => {
            // set error flag to true and isLoading to false to update UI
            this.stateSetter({
                daysForecast: [],
                isLoading: false,
                error: true
            });
        };

        const onSuccess = (data) => {
            this.stateSetter({
                daysForecast: data,
                isLoading: false // hide loading
            });
        };

        // set isLoading flag to true to update UI while waiting for data to render
        this.setState({ isLoading: true });

        WeatherService.getForecast({ lat: this.state.lat, lon: this.state.lon })
            .then(onSuccess)
            .catch(onError);
    };

    /**
     *	Verifies that the component is mounted before setting the state
     *	to avoid getting a warning for setting state on unmounted compoent
     */
    stateSetter = (stateParams) => {
        if (this.hasMounted) {
            this.setState(stateParams)
        }
    };

    render() {

        if (this.state.isLoading) {
            return <div className="loading-container">  <CircularProgress /> Loading.... </div>;
        }

        if (this.state.error) {
            return <Typography variant="h6" color="secondary" display="block">
            	 Something went wrong, please contact support at x@team.com or try again later! 
            </Typography>;
        }

        return (
            <Fragment>
      			<Typography variant="h4" gutterBottom>
      				 Weather Forecast for the next 5 days in {this.state.cityName} 
      			</Typography>
        		<WeatherTable daysForecast={this.state.daysForecast} />
      		</Fragment>
        );
    };
};

export default WeatherDashboard;