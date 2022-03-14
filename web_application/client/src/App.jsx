import React, { useState, useEffect } from "react";
import DetectionChart from "./components/DetectionChart";
import Header from "./components/Header";
import { postFile } from "./api/index";
const App = () => {
   const [file, setFile] = useState(null);
   const [fileName, setFileName] = useState("");

   const handlFileInput = async (e) => {
      e.preventDefault();
      const res = await postFile({ file, fileName });
      console.log(res);
   };

   return (
      <div className="flex flex-col min-h-screen w-full bg-[url('./assets/isroBackground.jpg')] bg-cover">
         <Header />

         <div className="flex grow w-full items-center justify-center">
            <DetectionChart />
            <form onSubmit={handlFileInput} style={{ color: "white" }}>
               <input
                  type="file"
                  name="file"
                  accept=".lc,.xls,.csv,.dat,.txt,.fits"
                  onChange={(e) => {
                     setFile(e.target.files[0]);
                     setFileName(e.target.files[0].name);
                  }}
               />
               <button type="submit" style={{ border: "2px solid red" }}>
                  Submit
               </button>
            </form>
         </div>
      </div>
   );
};

export default App;
