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

  let textFile = `Background Flux \t ${bgFlux}\n\n\n`;

  catClass.forEach((element, index) => {
    textFile =
      textFile +
      `Peak-${index + 1}\n==========\nCategory : ${element}\nDecay Time : ${
        decayTime[index]
      }\nRise TIme : ${riseTime[index]}\nPeak Flux : ${
        peakFlux[index]
      }\nPeak Time : ${peakArr[index]}\nStart Time : ${
        startArr[index]
      }\nEnd Time : ${endArr[index]}\n\n`;
  });

  return (
    <>
      {tableData.catClass.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <caption>
              The vertical blue lines in the fitted curve do not indicate the
              bursts' start and end time.
            </caption>
            <TableHead>
              <TableRow>
                <StyledTableCell>Peak</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Decay Time (s)</StyledTableCell>
                <StyledTableCell align="center">Rise Time (s)</StyledTableCell>
                <StyledTableCell align="center">
                  Peak Flux (ct/s)
                </StyledTableCell>
                <StyledTableCell align="center">Peak Time (s)</StyledTableCell>
                <StyledTableCell align="center">Start Time (s)</StyledTableCell>
                <StyledTableCell align="center">End Time (s)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {catClass.map((value, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {`Peak ${index + 1}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">{value}</StyledTableCell>
                  <StyledTableCell align="right">
                    {decayTime[index]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {riseTime[index]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {peakFlux[index]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {peakArr[index]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {startArr[index]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {endArr[index]}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="text-center text-5xl py-5 underline">
          No Peaks Detected
        </div>
      )}
      <div className="text-2xl p-5">
        Background Flux: <strong>{bgFlux} ct/s</strong>
      </div>
      <div className="flex justify-center">
        <div
          className="flex justify-center items-center w-1/2 rounded-lg p-3 text-white text-xl"
          style={{ backgroundColor: "#1976d2" }}
        >
          <a
            className="w-full text-center"
            href={`data:attachment/text, ${encodeURI(textFile)}`}
            target="_blank"
            download="solarlog.txt"
            rel="nore noreferrer"
          >
            <button>Download Logs</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
