import React from "react";
import Sidebar from "./Sidebar";


const Header = ({ state, toggleDrawer}) => {

  const downloadManual = () => {
    
  }

  return (
    <div className="flex w-full justify-between p-3 items-center bg-slate-800">
      <p className="text-white text-4xl">Solar Flare Finder</p>
      <div className="flex items-center">
        <button className="text-white text-lg mr-10 p-2" onClick={() => downloadManual}>Manual</button>
        <Sidebar state={state} toggleDrawer={toggleDrawer}/>
      </div>
    </div>
  );
};

export default Header;
