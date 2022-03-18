import React from "react";
import DetectionChart from "../components/DetectionChart";
import DataDrawer from "../components/DataDrawer";

const MainPage = ({ chartData, peakData, bgFlux }) => {
   const [isOpen, setIsOpen] = React.useState(true); //state to handle data drawer change

   const handleOpen = (open) => {
      setIsOpen(open);
   };

   return (
      <>
         <DetectionChart
            chartData={chartData}
            isOpen={isOpen}
            peakData={peakData}
         />
         <DataDrawer handleOpen={handleOpen} data={peakData} bgFlux={bgFlux} />
      </>
   );
};

export default MainPage;
