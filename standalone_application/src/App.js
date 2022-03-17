import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { parseCSV } from "./utils/parseCSV";
import Welcome from "./components/Welcome";
import DetectionChart from "./components/DectectionChart";
const App = () => {
  const [state, setState] = useState({
    left: true,
  });

  const [chartData, setChartData] = useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
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
    <div
      className="flex flex-col min-h-screen w-full bg-[url('./assets/isroBackground.jpg')] bg-cover"
      style={{ background: "url('./src/assets/isroBackground.jpg')" }}
    >
      <Header
        state={state}
        toggleDrawer={toggleDrawer}
        chartResults={handleChartResults}
      />
      <div className="flex grow" >
        {chartData.length === 0 ? (
          <Welcome onClickInputData={toggleDrawer} />
        ) : (
          <DetectionChart chartData={chartData} />
        )}
      </div>
    </div>
  );
};

export default App;
