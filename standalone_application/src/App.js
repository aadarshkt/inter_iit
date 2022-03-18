import React, { useState } from "react";
import Header from "./components/Header";
import MainPage from "./pages/main";
import Welcome from "./components/Welcome";
import { parseCSV, parsePeakCSV } from "./utils/parseCSV";
import MiniSpinner from "./components/MiniSpinner.jsx";

const App = () => {
   //handles left sidebar
   const [state, setState] = useState({
      left: false,
   });
   const [isLoading, setIsLoading] = useState(false);
   const [chartData, setChartData] = useState({});
   const [peakData, setPeakData] = useState({});
   const [bgFlux, setBgFlux] = useState(0);

   const toggleDrawer = (anchor, open) => (event) => {
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
         return;
      }

      setState({ ...state, [anchor]: open });
   };

   const closeDrawer = (anchor, open) => {
      setState({ ...state, [anchor]: open });
   };

   //Convert CSV response to required object
   const handleChartResults = (data) => {
      const resultData = parseCSV(data);
      setChartData(resultData);
   };
   const handlePeakResults = (data) => {
      const resultData = parsePeakCSV(data);
      setPeakData(resultData);
   };
   const handleBgFlux = (flux) => {
      setBgFlux(flux);
   };

   return (
      <div
         className="flex flex-col min-h-screen w-full bg-[url('./assets/isroBackground.jpg')] bg-cover"
         style={{ background: "url('./src/assets/isroBackground.jpg')" }}
      >
         <Header
            state={state}
            toggleDrawer={toggleDrawer}
            closeDrawer={closeDrawer}
            chartResults={handleChartResults}
            peakResults={handlePeakResults}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleBgFlux={handleBgFlux}
         />
         <div className="flex grow">
            {/* Loader */}
            {isLoading ? (
               <div className="flex flex-col items-center justify-center absolute right-1/2 bottom-1/2 z-10">
                  <MiniSpinner />
                  <div className="flex">
                     <p className="text-white text-center pt-2 text-2xl">
                        Loading
                     </p>
                  </div>
               </div>
            ) : Object.keys(chartData).length === 0 ? (
               <Welcome onClickInputData={toggleDrawer} />
            ) : (
               <MainPage
                  chartData={chartData}
                  peakData={peakData}
                  bgFlux={bgFlux}
               />
            )}
         </div>
      </div>
   );
};

export default App;
