import React from "react";

const Welcome = ({ onClickInputData }) => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center"
      style={{ height: "90vh" }}
    >
      <div
        className="flex flex-col w-2/3 items-center justify-center bg-white/20 pt-20 pb-20 rounded-lg"
        style={{
          backgroundColor: "rgb(255 255 255 / 0.2)",
        }}
      >
        <p className="text-white text-6xl font-bold">Solar Brust</p>
        <p className="text-white text-6xl font-bold"> Detection Portal</p>
        <div className="flex p-10 w-full justify-evenly">
          <button className="pl-5 font-bold w-1/3 pr-5 pt-2 pb-2 bg-blue-500 rounded-lg text-white">
            Downlaod Manual
          </button>
          <button
            onClick={onClickInputData(`left`, true)}
            className="text-white font-bold pl-5  w-1/3 pr-5 pt-2 pb-2 bg-blue-500 rounded-lg hover:bg-blue-500"
          >
            Input Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
