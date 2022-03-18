import React from "react";
import Sidebar from "./Sidebar";

const Header = ({
  state,
  toggleDrawer,
  closeDrawer,
  chartResults,
  peakResults,
  isLoading,
  setIsLoading,
  onLoad,
  handleBgFlux,
}) => {

  return (
    <div className="flex w-full justify-between p-3 items-center">
      <div className="flex items-center">
        <Sidebar
          state={state}
          toggleDrawer={toggleDrawer}
          closeDrawer={closeDrawer}
          chartResults={chartResults}
          peakResults={peakResults}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onLoad={onLoad}
          handleBgFlux={handleBgFlux}
        />
      </div>
    </div>
  );
};

export default Header;
