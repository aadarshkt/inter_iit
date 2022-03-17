import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DetectionChart from "./components/DetectionChart";
import Welcome from "./components/Welcome";
import { parseCSV } from "./utils/parseCSV";
import MiniSpinner from "./components/MiniSpinner.jsx";

const App = () => {
  const [state, setState] = useState({
    left: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const handleLoading = (loadState) => {
    setIsLoading(loadState);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    console.log(anchor + " " + open);
    setState({ ...state, [anchor]: open });
    console.log(state);
  };

  //Convert CSV response to required object
  const handleChartResults = (data) => {
    const resultData = parseCSV(data);
    setChartData(resultData);
    console.log(chartData);
  };

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('./assets/isroBackground.jpg')] bg-cover">
      <Header
        state={state}
        toggleDrawer={toggleDrawer}
        chartResults={handleChartResults}
        isLoading={isLoading}
        onLoad={handleLoading}
      />
      <div className="flex grow">
        {chartData.length === 0 ? (
          <Welcome onClickInputData={toggleDrawer} />
        ) : (
          <div className="flex grow">
            {isLoading ? (
              <MiniSpinner />
            ) : (
              <DetectionChart chartData={chartData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
