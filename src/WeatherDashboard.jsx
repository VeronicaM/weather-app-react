import React, {Fragment, Component} from 'react';

// Components
import WeatherTable from './forecast/ForecastTable.jsx';

// Services
import WeatherService from './forecast/weather.service.js';

// CSS
import './App.css';


// variables 

const defaultCity = {
	// London
	lat: '51.5074',
	lon: '-0.118092'
};

const defaultState = {
	daysForecast: [],
	lat: defaultCity.lat,
	lon: defaultCity.lon,
	isLoading: true,
	error: false
};

class App extends Component {
	
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
				isLoading: false // hide loader
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
		if(this.hasMounted) {
			this.setState(stateParams)
		}
	};

    render()  {

    	if(this.state.isLoading) {
    		return <div> Loading.... </div>;
    	}

    	if(this.state.error) {
    		return <div> Something went wrong, please contact support at x@team.com or try again later! </div>;  
    	}
 
    	return (
      		<Fragment>
        		<WeatherTable daysForecast={this.state.daysForecast} />
      		</Fragment>
    	);
	};
};

export default App;