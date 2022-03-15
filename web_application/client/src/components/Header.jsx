import React from "react";
import Sidebar from "./Sidebar";


const Header = ({ state, toggleDrawer}) => {

  const downloadManual = () => {
    
  }

  return (
    <div className="flex w-full justify-between p-3 items-center">
      <div className="flex items-center">
        <Sidebar state={state} toggleDrawer={toggleDrawer}/>
      </div>
    </div>
  );
};

export default Header;
