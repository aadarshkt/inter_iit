import React, { useEffect, useState } from "react";
import DetectionChart from "./components/DetectionChart";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('./assets/isroBackground.jpg')] bg-cover">
    <Header />
      <div className="flex grow w-full items-center justify-center">
        <DetectionChart />
      </div>
    </div>
  );
};

export default App;
