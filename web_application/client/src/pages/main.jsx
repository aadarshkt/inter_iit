import React from "react";
import DetectionChart from "../components/DetectionChart";
import DataDrawer from "../components/DataDrawer";

const MainPage = ({ chartData, peakData }) => {
  const [isOpen, setIsOpen] = React.useState(true);

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
      <DataDrawer handleOpen={handleOpen} />
    </>
  );
};

export default MainPage;
