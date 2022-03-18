import React from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ResetIcon from "@mui/icons-material/RestartAlt";
import ToolTip from "@mui/material/Tooltip";
import { Button } from "@mui/material";

const ChartFooter = ({
   rawOrConvolve,
   resetZoom,
   zoomIn,
   zoomOut,
   handleStitch,
   handlePeak,
}) => {
   return (
      <div className="flex justify-between">
         <div className="flex justify-evenly w-1/2">
            {/* if raw curve then disable the buttons */}
            {rawOrConvolve === "raw" ? (
               <>
                  <Button disabled variant="outlined">
                     Toggle Peaks
                  </Button>
                  <Button disabled variant="outlined">
                     Toggle Fit Curve
                  </Button>
               </>
            ) : (
               <>
                  <Button
                     style={{ backgroundColor: "rgb(25, 118, 210)" }}
                     variant="contained"
                     onClick={() => {
                        handlePeak();
                     }}
                  >
                     Toggle Peaks
                  </Button>
                  <Button
                     variant="contained"
                     style={{ backgroundColor: "rgb(25, 118, 210)" }}
                     onClick={() => {
                        handleStitch();
                     }}
                  >
                     Toggle Fit Curve
                  </Button>
               </>
            )}
         </div>
         {/* Zoom Button Group */}
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
                  style={{
                     fontSize: "2.6rem",
                     borderTop: "4px solid black",
                     borderBottom: "4px solid black",
                  }}
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
      </div>
   );
};

export default ChartFooter;
