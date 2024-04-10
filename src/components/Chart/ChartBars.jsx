import * as React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';
import {currencyFormatter} from "../../utils/utils.js";
import PropTypes from "prop-types";


const valueFormatter = (value) => {
    return currencyFormatter({
        currency: "USD", value
    })
};
const chartSetting = {
    width: 950,
    height: 300,
};

export default function BasicBars({dataset}) {
    return (
        <BarChart
            dataset={dataset}
            sx={{padding:'20px'}}
            xAxis={[{scaleType: 'band', dataKey: 'month'}]}
            series={[{dataKey: 'income', label: 'Quarterly net income',valueFormatter}, {
                dataKey: 'revenue',
                label: 'Quarterly total revenue',
                valueFormatter

            }, {
                dataKey: 'totalShareholderEquity',
                label: 'Total shareholder equity',
                valueFormatter
            },]}
            {...chartSetting}
        />
    );
}
BasicBars.propTypes = {
    dataset: PropTypes.array
};

BasicBars.defaultProps = {
    dataset: []
};
