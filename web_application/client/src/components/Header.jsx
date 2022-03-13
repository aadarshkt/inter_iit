import React from "react";

const Header = () => {
  return (
    <div className="flex w-full justify-between p-3 items-center bg-slate-800">
      <p className="text-white text-4xl">Solar Flare Finder</p>
      <div className="flex items-center">
        <a href="https://fast.com/" target="_blank" rel="noreferrer"><button className="text-white text-lg mr-10 p-2">Manual</button></a>
      </div>
    </div>
  );
};

export default Header;
