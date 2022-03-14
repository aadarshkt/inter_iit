import React, { useState, useEffect } from "react";
import DetectionChart from "./components/DetectionChart";
import Header from "./components/Header";
import { postFile } from "./api/index";
const App = () => {
   const [state, setState] = React.useState({
      left: true,
   });

   const toggleDrawer = (anchor, open) => (event) => {
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
         return;
      }

      setState({ ...state, [anchor]: open });
   };

   return (
      <div className="flex flex-col min-h-screen w-full bg-[url('./assets/isroBackground.jpg')] bg-cover">
         <Header state={state} toggleDrawer={toggleDrawer} />
         <div className="flex flex-col grow w-full items-center justify-center">
            <DetectionChart />
         </div>
      </div>
   );
};

export default App;
