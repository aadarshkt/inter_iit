import React from "react";
import DetectionChart from "../components/DetectionChart";
import DataDrawer from "../components/DataDrawer";

const MainPage = ({ chartData }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleOpen = (open) => {
    setIsOpen(open);
    console.log(open);
  };

  return (
    <>
      <DetectionChart chartData={chartData} isOpen={isOpen} />
      <DataDrawer handleOpen={handleOpen}/>
    </>
  );
};

export default MainPage;
