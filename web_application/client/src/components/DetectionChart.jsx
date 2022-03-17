import React, { useRef, useState, useEffect } from "react";
import CurveTypes from "./CurveTypes";
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
import ChartFooter from "./ChartFooter";

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

const chartSettings = {
  fill: false,
  lineTension: 0.05,
  pointBorderColor: "rgba(75,192,192,1)",
  pointBackgroundColor: "rgba(75,192,192,1)",
  pointBorderWidth: 1,
  pointHoverRadius: 6,
  pointHoverBorderColor: "black",
  pointHoverBorderWidth: 5,
  pointRadius: 1,
  pointHitRadius: 10,
};

const additionalChartSetting = {
  label: "Rate",
  borderColor: "rgba(75,192,192,1)",
  backgroundColor: "rgba(75,192,192,0.4)",
  pointHoverBackgroundColor: "rgba(75,192,192,1)",
};
const additionalFitChartSetting = {
  label: "FIT_CURVE",
  borderColor: "rgba(255, 10, 63, 0.5)",
  backgroundColor: "rgba(255, 10, 63, 1)",
  pointHoverBackgroundColor: "rgba(255, 10, 63, 1)",
};

const optionSettings = {
  scales: {
    x: {
      gridLines: {
        display: true,
      },
      title: {
        display: true,
        text: "Time",
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
        text: "Rate",
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

const DetectionChart = ({ chartData, isOpen }) => {
  const [value, setValue] = useState("raw");
  const [width, setWidth] = useState("w-full");
  const [stitchOpen, setStitchOpen] = useState(false);
  const handleStitch = () => {
    setStitchOpen(!stitchOpen);
    console.log(stitchOpen);
    console.log(datasetArr);
  };
  const chartRef = useRef(null);

  const { time, rate, convolve, stitch } = chartData;

  const [datasetArr, setDatasetArr] = useState([
    {
      ...chartSettings,
      ...additionalChartSetting,
      data: rate,
    },
  ]);

  useEffect(() => {
    if (value === "raw")
      setDatasetArr([
        {
          ...chartSettings,
          ...additionalChartSetting,
          data: rate,
        },
      ]);
    else {
      if (stitchOpen)
        setDatasetArr([
          {
            ...chartSettings,
            ...additionalFitChartSetting,
            data: stitch,
          },
          {
            ...chartSettings,
            ...additionalChartSetting,
            data: convolve,
          },
        ]);
      else
        setDatasetArr([
          {
            ...chartSettings,
            ...additionalChartSetting,
            data: convolve,
          },
        ]);
    }
  }, [value, rate, convolve, stitchOpen, stitch]);

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

  useEffect(() => {
    if (isOpen) setWidth("w-4/5");
    else setWidth("w-4/5");
  }, [isOpen]);

  // useEffect(() => {
  //   console.log(datasetArr);
  // }, [datasetArr]);

  const data = {
    labels: time,
    datasets: datasetArr,
  };

  const lineOptions = {
    ...optionSettings,
    onClick: (e, element) => {
      if (element.length > 0) {
        var ind = element[0].index;
        alert(`${chartData.x[ind]}, ${chartData.y[ind]}`);
      }
    },
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        className={`flex flex-col ${width} items-center bg-white rounded-lg pr-10 pl-5 pb-5 mb-5 ml-5`}
      >
        <p className="font-bold text-xl p-3">
          Detection of solar bursts in X-Ray light curve data
        </p>

        <div className="flex flex-col-reverse items-center w-full">
          <div className="w-full">
            <Line ref={chartRef} data={data} options={lineOptions} />
            <ChartFooter
              rawOrConvolve={value}
              handleStitch={handleStitch}
              resetZoom={resetZoom}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
            />
          </div>
          <div className="px-4 mx-3 text-center">
            <FormControl>
              <FormLabel
                id="demo-row-controlled-radio-buttons-group"
                className="mr-3"
              >
                Select Curve to Display
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-controlled-radio-buttons-group"
                name="row-controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <CurveTypes />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetectionChart;
