import React from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ResetIcon from "@mui/icons-material/RestartAlt";
import ToolTip from "@mui/material/Tooltip";

const ZoomGroup = ({ resetZoom, zoomIn, zoomOut }) => {
  return (
    <div className="flex justify-end w-full items-center">
      <ToolTip title="Zoom Out" arrow>
        <ZoomOutIcon
          className="px- cursor-pointer rounded border-4 border-black"
          style={{ fontSize: "2.6rem" }}
          onClick={zoomOut}
        >
          Zoom Out
        </ZoomOutIcon>
      </ToolTip>
      <ToolTip title="Reset" arrow>
        <ResetIcon
          className="px- cursor-pointer rounded border-y-4 border-x-1 border-black"
          style={{ fontSize: "2.6rem" }}
          onClick={resetZoom}
        >
          Reset Zoom
        </ResetIcon>
      </ToolTip>
      <ToolTip title="Zoom In" arrow>
        <ZoomInIcon
          className="px- cursor-pointer rounded border-4 border-black"
          style={{ fontSize: "2.6rem" }}
          onClick={zoomIn}
        >
          Zoom In
        </ZoomInIcon>
      </ToolTip>
    </div>
  );
};

export default ZoomGroup;
