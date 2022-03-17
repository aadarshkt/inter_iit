import React from "react";
import Sidebar from "./Sidebar";

const Header = ({
  state,
  toggleDrawer,
  chartResults,
  isLoading,
  setIsLoading,
  onLoad,
}) => {
  const downloadManual = () => {};

  return (
    <div className="flex w-full justify-between p-3 items-center">
      <div className="flex items-center">
        <Sidebar
          state={state}
          toggleDrawer={toggleDrawer}
          chartResults={chartResults}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
};

export default Header;
