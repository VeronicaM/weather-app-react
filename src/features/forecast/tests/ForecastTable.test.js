import React from 'react';
import ReactDOM from 'react-dom';

// Mocks
import mockForecast from '../../../__mocks__/forecast.mock.js';

import { shallow } from 'enzyme';

// Components
import ForecastTable from '../ForecastTable.jsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

it('should render Empty Table with no data available message if no data forecast', () => {
    const component = shallow(<ForecastTable daysForecast={[]} />);
    const renderEmptyTable = <Typography variant="body1">
              	No data available
    </Typography>;
    
    expect(component.contains(renderEmptyTable)).toBe(true);
});

it('should render rows table with time and temperature', () => {
    const component = shallow(<ForecastTable daysForecast={mockForecast.proccessedForecastData} />);
   	// check that a row is rendered for each corresponding forecast day
    expect(component.find(TableRow).length).toBe(6);
    // check that cells are not empty
    expect(component.find(TableCell).isEmpty()).toBe(false);
});