import axios from "axios";
import React from "react";

const Header = () => {

  const downloadManual = () => {
    try {
      const res = axios.get(`http://localhost:5000/manual`)
    } catch (error) {
      
    }
  }

  return (
    <div className="flex w-full justify-between p-5 items-center">
      <p className="text-white text-4xl">Solar Flare Finder</p>
      <div className="flex items-center">
        <button className="text-white text-lg mr-10 p-2" onClick={() => downloadManual}>Manual</button>
        <button className="text-black font-medium pl-5 pr-5 bg-white rounded-lg pb-2 pt-2">Upload</button>
      </div>
    </div>
  );
};

export default Header;
