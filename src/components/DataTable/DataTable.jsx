import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import PropTypes from "prop-types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'blue',
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function DataTable({header, children}) {
    return(
        <TableContainer component={Paper} style={{ height: 400, width: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {header.map((item) => (
                            <StyledTableCell key={item.id} align={item.align}>{item.name}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
DataTable.prototype = {
    header: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            align: PropTypes.string,
        })
    ).isRequired,
    children: PropTypes.node.isRequired,
}
