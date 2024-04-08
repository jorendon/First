import * as React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';
import {currencyFormatter} from "../../utils/utils.js";


const valueFormatter = (value) => {
    return currencyFormatter({
        currency: "USD", value
    })
};
const chartSetting = {
    width: 850,
    height: 300,
};

export default function BasicBars({dataset}) {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{scaleType: 'band', dataKey: 'month'}]}
            series={[{dataKey: 'income', label: 'Quarterly net income', valueFormatter}, {
                dataKey: 'revenue',
                label: 'Quarterly total revenue',
                valueFormatter
            }, {
                dataKey: 'totalShareholderEquity',
                label: 'Total shareholder equity',
                valueFormatter
            }]}
            {...chartSetting}
        />
    );
}
