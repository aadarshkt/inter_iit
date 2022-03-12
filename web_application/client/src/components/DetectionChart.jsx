import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Scatter } from "react-chartjs-2";

const DetectionChart = () => {
  const labels = ["Mar", "May", "Jul", "Sep", "Nov"];
  const [countRate, setCountRate] = useState({});

  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  // scaleLabel: {
  //   display: true,
  //   labelString: "log (count rate) [c/s]",
  // },

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "April 30, 2009",
        },
      },
      y: {
        title: {
          display: true,
          text: "log (count rate) [c/s]",
        },
      },
    },
  };

  async function getResponse() {
    try {
      const res = await axios.get(`http://localhost:5000/`);
      console.log(res);
      setCountRate(res.data.countRate);
    } catch (error) {
      console.log("Error message is " + error.message);
    }
  }

  useEffect(() => {
    getResponse();
  }, []);

  const chartData = {
    datasets: [
      {
        label: "Peak Flux",
        data: countRate,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
      <div className="flex flex-col w-2/3 items-center bg-white rounded-md pr-10 pl-5 pb-5 m-5 shadow-lg">
        <p className="font-medium p-3">
          Detection of solar flares in x-ray light curve data
        </p>
        <Scatter options={options} data={chartData} />
      </div>
  );
};

export default DetectionChart;
