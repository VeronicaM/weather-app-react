import React from 'react';

// Components
import WeatherDashboard from './features/weather-dashboard/WeatherDashboard.jsx';
import Container from '@material-ui/core/Container';

const App = () => {
	return (<Container className="main-container"> 
		<WeatherDashboard />
	</Container>);
};

export default App;
