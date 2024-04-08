import {useEffect, useState} from 'react'
import '../../App.css'
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
    balanceParserData,
    currencyFormatter,
    dateFormatted,
    findShareHolder,
    incomeParserData
} from "../../utils/index.js";
import DataTable from "../DataTable/DataTable.jsx";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import BasicBars from "../Chart/ChartBars.jsx";
import * as React from "react";
import getUniqueListBy from "../../utils/utils.js";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function IncomeView() {
    const [quarterIncome, setQuarterIncome] = useState([]);
    const [balance, setBalance] = useState([]);
    const [years, setYears] = useState([]);
    const [year, setYear] = useState(2023);
    const [dataset, setDataset] = useState([]);
    const apiKey = 'demo';//'VQSL0968KOHSF0PL'
    const getIncomeStatement = async () => {
        const response = await fetch('https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=' + apiKey, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const data = await response.json()
            const {quarterlyReports = []} = data;
            const quarterlyIncome = incomeParserData(quarterlyReports);
            setQuarterIncome(quarterlyIncome)
        } else {
            console.error('Failed to fetch income statement')
        }
    }
    const getBalance = async () => {
        const response = await fetch('https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=' + apiKey, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const data = await response.json()
            const {quarterlyReports = []} = data;
            const balanceParser = balanceParserData(quarterlyReports);
            setBalance(balanceParser)
        } else {
            console.error('Failed to fetch income statement')
        }
    }

    useEffect(() => {
        const yearsData = quarterIncome.map((item) => {
            const d = new Date(item.fiscalDateEnding);
            let year = d.getFullYear();
            return {
                label: year,
                value: year,
            }
        });
        const arr1 = getUniqueListBy(yearsData, 'label')
        setYears(arr1);
    }, [quarterIncome]);

    useEffect(() => {
        getIncomeStatement()
        getBalance()
     } , [])
    const header = [
        {name: 'Net Income', align: 'left'},
        {name: 'Total Revenue', align: 'left'},
        {name: 'Fiscal Date Ending', align: 'center'},
        {name: 'Reported Currency', align: 'center'},
    ];

    function Row({row}) {
        const {netIncome, totalRevenue, fiscalDateEnding, reportedCurrency} = row;
        const netIncomeValue = currencyFormatter({
            currency: "USD", value: netIncome
        });
        const totalRevenueValue = currencyFormatter({
            currency: "USD", value: totalRevenue
        });

        const dateFormat = dateFormatted(fiscalDateEnding);

        return (
            <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <StyledTableCell align="left">{netIncomeValue}</StyledTableCell>
                <StyledTableCell align="left">{totalRevenueValue}</StyledTableCell>
                <StyledTableCell align="center">{dateFormat}</StyledTableCell>
                <StyledTableCell align="center">{reportedCurrency}</StyledTableCell>
            </StyledTableRow>
        );
    }

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    useEffect( () => {
        if(quarterIncome.length === 0 || balance.length === 0) return;
        const dataObjects = quarterIncome.map((item) => {
            const {totalRevenue, netIncome, fiscalDateEnding} = item;
            const balanceObject =findShareHolder(balance, fiscalDateEnding);
            const {totalShareholderEquity} = balanceObject;
            const dateFormat = dateFormatted(fiscalDateEnding);
            return {
                'income': netIncome,
                'revenue': totalRevenue,
                'month': dateFormat,
                'totalShareholderEquity': totalShareholderEquity,
            }
        });
        const dataByYear = dataObjects.filter((item) => {
            const d = new Date(item.month);
            let itemYear = d.getFullYear();
            return itemYear === year;
        });
         setDataset(dataByYear);
    }, [year, quarterIncome, balance]);

    return (
        <>
            <FormControl>
                <InputLabel>Year</InputLabel>
                <Select id="year-select" value={year} onChange={handleChange}>
                    {years.map((item) => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {dataset.length > 0 && <BasicBars dataset={dataset}/>}
            <DataTable header={header}>
                {quarterIncome.map((row) => (
                    <Row key={row.name} row={row}/>
                ))}
            </DataTable>
        </>
    );
}
