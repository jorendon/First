import {styled} from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import {currencyFormatter, dateFormatted} from "../../../utils/index.js";
import * as React from "react";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import PropTypes from "prop-types";

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

Row.propTypes = {
    row: PropTypes.shape({
        netIncome: PropTypes.number,
        totalRevenue: PropTypes.number,
        fiscalDateEnding: PropTypes.string,
        reportedCurrency: PropTypes.string
    }).isRequired
};

export default Row;
