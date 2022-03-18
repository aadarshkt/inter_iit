import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function MiniSpinner(props) {
  const { size } = props;
  return (
    <CircularProgress
      size={size || 48}
      style={{
        color: "white",
      }}
    />
  );
}

export default MiniSpinner;
