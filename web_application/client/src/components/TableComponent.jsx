import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableComponent = ({ tableData, bgFlux }) => {
  const { catClass, decayTime, riseTime, peakFlux, peakArr, startArr, endArr } =
    tableData;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Peak</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Decay Time</StyledTableCell>
            <StyledTableCell align="right">Rise Time</StyledTableCell>
            <StyledTableCell align="right">Peak Flux</StyledTableCell>
            <StyledTableCell align="right">Peak Time</StyledTableCell>
            <StyledTableCell align="right">Start Time</StyledTableCell>
            <StyledTableCell align="right">End Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {catClass.map((value, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {`Peak ${index + 1}`}
              </StyledTableCell>
              <StyledTableCell align="right">{value}</StyledTableCell>
              <StyledTableCell align="right">
                {decayTime[index]}
              </StyledTableCell>
              <StyledTableCell align="right">{riseTime[index]}</StyledTableCell>
              <StyledTableCell align="right">{peakFlux[index]}</StyledTableCell>
              <StyledTableCell align="right">{peakArr[index]}</StyledTableCell>
              <StyledTableCell align="right">{startArr[index]}</StyledTableCell>
              <StyledTableCell align="right">{endArr[index]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
