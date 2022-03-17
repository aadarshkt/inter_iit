import Papa from "papaparse";

export const parsePeakCSV = (csv) => {
  let catClass = [];
  let decayTime = [];
  let riseTime = [];
  let peakFlux = [];
  let xPeakArr = [];
  let yPeakArr = [];
  let peakArr = [];

  const obj = Papa.parse(csv.peakParams);

  obj.data.forEach((value, index) => {
    if (index !== 0 && index !== obj.data.length - 1) {
      catClass.push(value[0]);
      decayTime.push(value[1]);
      riseTime.push(value[2]);
      peakFlux.push(value[3]);
      for (let i = 4; i <= 6; i++) {
        xPeakArr.push(value[i]);
        yPeakArr.push("0");
      }
      peakArr.push(value[5]);
    }
  });
  const result = {
    catClass,
    decayTime,
    riseTime,
    peakFlux,
    xPeakArr,
    yPeakArr,
    peakArr,
  };
  return result;
};


export const parseCSV = (csv) => {
  let timeArr = [];
  let rateArr = [];
  let convolveArr = [];
  let stitchArr = [];
  const obj = Papa.parse(csv.curveData);
  obj.data.forEach((value, index) => {
    if (index !== 0 && index % 50 === 0) {
      timeArr.push(value[0]);
      rateArr.push(value[1]);
      convolveArr.push(value[2]);
      stitchArr.push(value[3]);
    }
  });
  const result = {
    time: timeArr,
    rate: rateArr,
    convolve: convolveArr,
    stitch: stitchArr,
  };
  return result;
};
