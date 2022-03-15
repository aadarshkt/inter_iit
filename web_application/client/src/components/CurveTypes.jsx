import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const CurveTypes = () =>{
  return (
    <>
      <FormControlLabel value="raw" control={<Radio />} label="Raw" />
      <FormControlLabel value="convolve" control={<Radio />} label="Convolved" />
      <FormControlLabel value="peaks" control={<Radio />} label="Peaks" />
    </>
  );
}

export default CurveTypes