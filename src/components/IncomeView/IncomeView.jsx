import {useEffect, useState} from 'react'
import '../../App.css';
import {
    balanceParserData, csvJSON,
    dateFormatted,
    findShareHolder,
    incomeParserData, symbolOptionsParserData, uuidv4,
} from "../../utils/index.js";
import DataTable from "../DataTable/DataTable.jsx";
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import BasicBars from "../Chart/ChartBars.jsx";
import getUniqueListBy from "../../utils/utils.js";
import CircularUnderLoad from "../CircularUnderLoad/CircularUnderLoad.jsx";
import {useSnackbar} from 'notistack';
import Row from "../DataTable/Row/Row.jsx";

const DEFAULT_YEARS_OPTION = {
    label: 'Every Years',
    value: 0,
};

import {API_URL, API_KEY} from '../../utils/constants.js';

export default function IncomeView() {
    const [quarterIncome, setQuarterIncome] = useState([]);
    const [balance, setBalance] = useState([]);
    const [years, setYears] = useState([]);
    const [symbols, setSymbols] = useState([]);
    const [symbolsData, setSymbolsData] = useState([]);
    const [symbol, setSymbol] = useState({label: 'International Business Machines Corp', value: 'IBM'});
    const [year, setYear] = useState(0);
    const [dataset, setDataset] = useState([]);
    const [dataQuarterIncome, setDataQuarterIncome] = useState([]);
    const [loading, setLoading] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const getSymbols = async () => {
        try{
        const response = await fetch(API_URL + 'query?function=LISTING_STATUS&apikey=' + API_KEY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const text = await new Response(response.body).text();
            const jsonSymbols = csvJSON(text);
            const symbolsData = symbolOptionsParserData(jsonSymbols);
            const uniqueSymbols = getUniqueListBy(symbolsData, 'label');
            setSymbolsData(uniqueSymbols)
        } else {
            enqueueSnackbar('Failed to fetch income statement', {variant: 'error'});
        }}catch(e){
            enqueueSnackbar('Failed to fetch income statement', {variant: 'error'});
        }finally {
            setLoading(false)
        }
    }
    const getIncomeStatement = async (value) => {
        try{
        const response = await fetch(API_URL + 'query?function=INCOME_STATEMENT&symbol=' + value + '&apikey=' + API_KEY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const data = await response.json()
            const {quarterlyReports = [], Information = null} = data;
            if (Information) {
                setQuarterIncome([])
                setDataset([])
                enqueueSnackbar('This has error obtaining income statement. '+Information, {variant: 'warning'});
            } else {
                const quarterlyIncome = incomeParserData(quarterlyReports);
                setQuarterIncome(quarterlyIncome)
            }
        } else {
            enqueueSnackbar('Failed to fetch income statement', {variant: 'error'});
        }}catch(e){
            enqueueSnackbar('Failed to fetch income statement', {variant: 'error'});

        } finally {
            setLoading(false)
        }
    }

    const getBalance = async (value) => {
        try {
        const response = await fetch(API_URL + 'query?function=BALANCE_SHEET&symbol=' + value + '&apikey=' + API_KEY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const data = await response.json()
            const {quarterlyReports = [], Information = null} = data;
            if (Information) {
                setQuarterIncome([])
                setDataset([])
                enqueueSnackbar('This has error obtaining the balance. '+Information, {variant: 'warning'});
            } else {
                const balanceParser = balanceParserData(quarterlyReports);
                setBalance(balanceParser)
            }
        } else {
            enqueueSnackbar('Failed to fetch balance', {variant: 'error'});
        }}catch(e){
            enqueueSnackbar('Failed to fetch balance', {variant: 'error'});

        }   finally {
            setLoading(false)
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
        const dataDefault = [DEFAULT_YEARS_OPTION, ...arr1]
        setYears(dataDefault);
    }, [quarterIncome]);

    useEffect(() => {
        getSymbols()
    }, [])

    useEffect(() => {
        if (symbol === null || symbol.value === '') return;
        getIncomeStatement(symbol.value)
        getBalance(symbol.value)
    }, [symbol])

    const handleSymbol = (value) => {
        if (value.length > 3) {
            const filterSymbols = symbolsData.filter((item) => {
                return item.label.toLowerCase().includes(value.toLowerCase())
            });
            setSymbols(filterSymbols)
        } else {
            setSymbols([])
        }
    }

    const header = [
        {name: 'Net Income', align: 'left', id: uuidv4()},
        {name: 'Total Revenue', align: 'left', id: uuidv4()},
        {name: 'Fiscal Date Ending', align: 'center', id: uuidv4()},
        {name: 'Reported Currency', align: 'center', id: uuidv4()},
    ];

    const handleChange = (event) => {
        setYear(event.target.value);
    };
    const handleChangeSymbol = (option) => {
        setSymbol(option);
    };

    useEffect(() => {
        if (quarterIncome.length === 0 || balance.length === 0) return;
        const dataObjects = quarterIncome.map((item) => {
            const {totalRevenue, netIncome, fiscalDateEnding} = item;
            const balanceObject = findShareHolder(balance, fiscalDateEnding);
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
        setDataset(year === 0 ? dataObjects : dataByYear);
        setLoading(false)
    }, [year, quarterIncome, balance]);


    if (loading) return (<CircularUnderLoad/>);
    return (
        <>
            <FormControl>
                <Autocomplete
                    disablePortal
                    id="combo-symbol"
                    options={symbols}
                    sx={{width: 600}}
                    value={symbol}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Symbol" onChange={(e) => {
                        handleSymbol(e.target.value);

                    }}/>}
                    onChange={(option, newValue) => {
                        handleChangeSymbol(newValue)
                    }
                    }
                />
            </FormControl>
            {symbol !== null &&
                <FormControl style={{paddingLeft: 8}}>
                    <InputLabel>Year</InputLabel>
                    <Select id="year-select" value={year} onChange={handleChange} sx={{width: 400}}>
                        {years.map((item) => (
                            <MenuItem value={item.value} key={item.value}
                                      selected={item.value === year}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>}
            {dataset.length > 0 && <BasicBars dataset={dataset}/>}
            {quarterIncome.length > 0 && <DataTable header={header}>
                {quarterIncome.map((row) => (
                    <Row key={row.id} row={row}/>
                ))}
            </DataTable>}
        </>
    );
}
