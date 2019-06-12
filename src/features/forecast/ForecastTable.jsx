// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const WeatherTable = (props) => {

    const getTimeCells = (forcastObj, index) => {
        const timeForecastKey = `${index}_${forcastObj.temperature}`;

        return (
            <TableCell align="right" key={timeForecastKey}>
              <div>
                <span> time: {forcastObj.time} </span>
                <span> temp: {forcastObj.temperature} 
                   {/* display degree and unit value based from unitType */}
                   {props.unitType === 'F' ? <span> &#8457; </span> : <span> &#8451; </span> }
                </span> 
              </div> 
          </TableCell>
        );
    };

    const renderDayRow = (dayForecast, index) => {

        // Render Each time forecast in a cell
        const timeCells = dayForecast.values.map(getTimeCells);

        // create a unique key for this day row
        const forecastRowKey = `${index}_${dayForecast.date}`;
        const styles = {
            backgroundColor: index % 2 === 0 ? '#f1f8e9' : '#dcedc8'
        };

        return (
            <TableRow key={forecastRowKey} style={styles}>
              {/* display date string as first cell followed by forcast values cells */}
              <TableCell align="right"> {dayForecast.date} </TableCell>  
              {timeCells}
          </TableRow>
        );
    };

    const renderEmptyState = () => {
        return (
            <Typography variant="body1">
              No data available
            </Typography>
        );
    };

    const renderTable = () => {
        if (!props.daysForecast.length) {
            return renderEmptyState();
        }

        return (
            <Table size="small">
              <TableBody>
                {props.daysForecast.map(renderDayRow)}
              </TableBody>
          </Table>
        );
    };
    return renderTable();
};

WeatherTable.propTypes = {
    daysForecast: PropTypes.array.isRequired,
    unitType: PropTypes.string
};

WeatherTable.defaultProps = {
    unitType: 'F'
};

export default WeatherTable;