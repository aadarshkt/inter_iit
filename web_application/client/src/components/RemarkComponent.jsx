import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const RemarkComponent = () => {
  return (
    <div className="w-full text-left mt-5">
      <strong>
        <u>Remarks:</u>
      </strong>
      <ul className="list-disc mx-5">
        <li>
          The raw data, initially, has a lot of noise in it and to analyse the
          data we first convolve it. This reduces the uneccessary detail and
          allows for a much more readable graph.
        </li>
        <li>
          After detecting and selecting the peaks we fit the function to the
          peaks which are large increase in intensities. The peaks are labelled
          numerically starting from 1 and parameters corresponding to each peak
          are displayed in the right sidebar.
        </li>
        <li>
          The peak-parameters are computed and the different curves which have
          been fit are stitched together for displaying purposes.
        </li>
        <li>
          A downloadable log file is available which contains more information
          on the peak's parameters.
        </li>
        <li>
          The flares are catgorized into five categories based on the peak count
          rate.
        </li>
        <TableContainer component={Paper} style={{ width: "50%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Category</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Peak Count (ct/s)</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">Sub Class</TableCell>
                <TableCell align="center">0 - 70</TableCell>
              </TableRow>
              <TableRow
                key={2}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">A</TableCell>
                <TableCell align="center">70 - 1K</TableCell>
              </TableRow>
              <TableRow
                key={3}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">B</TableCell>
                <TableCell align="center">1K - 10K</TableCell>
              </TableRow>
              <TableRow
                key={4}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">C</TableCell>
                <TableCell align="center">10K - 100K</TableCell>
              </TableRow>
              <TableRow
                key={5}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">M</TableCell>
                <TableCell align="center">100K - 1000K</TableCell>
              </TableRow>
              <TableRow
                key={6}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">X</TableCell>
                <TableCell align="center">1000K - 10000K</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ul>
    </div>
  );
};

export default RemarkComponent;
