import React, { useRef, useState } from "react";
import CurveTypes from "./CurveTypes";
import ZoomGroup from "./ZoomGroup";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const maxSize = 1500;

const data = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Light Curve",
      fill: false,
      lineTension: 0.05,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "black",
      pointBorderWidth: 1,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 3,
      pointHitRadius: 10,
      data: [1500000, 3900000, 3000000, 4100000, 2300000, 1800000, 2000000],
      // data:{
      //   January: 10,
      //   February: 20,
      // }
    },
  ],
};

const lineOptions = {
  onClick: (e, element) => {
    if (element.length > 0) {
      var ind = element[0]._index;
      alert(ind);
    }
  },
  scales: {
    x: {
      gridLines: {
        display: true,
      },
      title: {
        display: true,
        text: "value",
        font: {
          family: "Comic Sans MS",
          size: 20,
          weight: "bold",
          lineHeight: 1.2,
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },

    y: {
      // stacked: true,
      gridLines: {
        display: true,
      },
      title: {
        display: true,
        text: "value",
        font: {
          family: "Comic Sans MS",
          size: 20,
          weight: "bold",
          lineHeight: 1.2,
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },
  },
  legend: {
    display: true,
  },
  tooltips: {
    enabled: true,
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "xy",
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "xy",
      },
    },
  },
};
const DetectionChart = () => {
  const [value, setValue] = useState("raw");
  const chartRef = useRef(null);

  const [width, setWidth] = useState(window.innerWidth);

  const changeDir = () => {
    setWidth(window.innerWidth);
  };
  window.addEventListener("resize", changeDir);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const resetZoom = () => {
    chartRef.current.resetZoom();
  };
  const zoomIn = () => {
    chartRef.current.zoom(1.1);
  };
  const zoomOut = () => {
    chartRef.current.zoom(0.9);
  };
  return (
    <div className="flex flex-col w-4/5 items-center bg-white rounded-md pr-10 pl-5 pb-5 m-5 shadow-lg">
      <p className="font-bold text-xl p-3">
        Detection of solar flares in X-Ray light curve data
      </p>

      <div
        className={
          width < maxSize
            ? "flex flex-col-reverse items-center w-full"
            : "flex items-center w-full"
        }
      >
        <div className="w-full">
          <Line ref={chartRef} data={data} options={lineOptions} />
          <ZoomGroup resetZoom={resetZoom} zoomIn={zoomIn} zoomOut={zoomOut} />
        </div>
        <div className="px-4 mx-3">
          <FormControl>
            <FormLabel
              id={
                width < maxSize
                  ? "demo-row-controlled-radio-buttons-group"
                  : "demo-controlled-radio-buttons-group"
              }
            >
              Select Curve to Display
            </FormLabel>

            {width < maxSize ? (
              <RadioGroup
                row
                aria-labelledby="demo-row-controlled-radio-buttons-group"
                name="row-controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <CurveTypes />
              </RadioGroup>
            ) : (
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <CurveTypes />
              </RadioGroup>
            )}
          </FormControl>
        </div>
      </div>
    </div>
  );
};
export default DetectionChart;
