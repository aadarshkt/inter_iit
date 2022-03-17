import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MainPage from "./pages/main";
import Welcome from "./components/Welcome";
import { parseCSV } from "./utils/parseCSV";
import MiniSpinner from "./components/MiniSpinner.jsx";

const App = () => {
  const [state, setState] = useState({
    left: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({});

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
    <div className="flex flex-col min-h-screen w-full bg-[url('./assets/isroBackground.jpg')] bg-cover">
      <Header
        state={state}
        toggleDrawer={toggleDrawer}
        chartResults={handleChartResults}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className="flex grow">
        {isLoading ? (
          <>
            <div>Loading...</div>
            <MiniSpinner />
          </>
        ) : Object.keys(chartData).length === 0 ? (
          <Welcome onClickInputData={toggleDrawer} />
        ) : (
          <MainPage chartData={chartData} />
        )}
      </div>
    </div>
  );
};

export default App;
