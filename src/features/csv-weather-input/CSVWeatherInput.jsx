import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI Components
import TextField from '@material-ui/core/TextField';

// Services
import WeatherCSVService from './weatherCSV.service.js';

class CSVWeatherInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            csvInput: ''
        };
    };

    onCSVInput = (event) => {
        const parsedWeatherData = WeatherCSVService.parseForecastData(event.target.value);
        this.setState({ csvInput: event.target.value });
        this.props.onCSVInputProcessed(parsedWeatherData);
    };

    render() {
        const placeholderText = `
        Input Weather forecast in CSV format:
    	2017-07-23 09:00:00, 291.12 
    	2017-07-23 12:00:00, 292.00
    	2017-07-23 15:00:00,289.34`;

        return (<TextField
          fullWidth
          margin="normal"
          placeholder={placeholderText}
		  multiline={true}
		  rows={6}
		  rowsMax={6}
		  onChange={this.onCSVInput}
		/>)
    }
};

CSVWeatherInput.propTypes = {
    onCSVInputProcessed: PropTypes.func.isRequired
};

export default CSVWeatherInput;
