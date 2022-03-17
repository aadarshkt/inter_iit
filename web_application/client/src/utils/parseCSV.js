import Papa from "papaparse";

let peakArr = []; 
export const parsePeakCSV = (csv) => {
  let catClass = [];
  let decayTime = [];
  let riseTime = [];
  let peakFlux = [];
  let xPeakArr = [];
  let yPeakArr = [];

  const obj = Papa.parse(csv.peakParams);

  obj.data.forEach((value, index) => {
    if (index !== 0 && index !== obj.data.length - 1) {
      catClass.push(value[0]);
      decayTime.push(value[1]);
      riseTime.push(value[2]);
      peakFlux.push(value[3]);
      peakArr.push(value[4]);
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
  let origTime = [];
  let rateArr = [];
  let convolveArr = [];
  let stitchArr = [];
  const obj = Papa.parse(csv.curveData);
  console.log(peakArr);
  obj.data.forEach((value, index) => {
    origTime.push(value[0]);
    if (peakArr.includes(index) || (index !== 0 && index % 50 === 0)) {
      timeArr.push(value[0]);
      rateArr.push(value[1]);
      convolveArr.push(value[2]);
      stitchArr.push(value[3]);
    }
  });
  console.log(timeArr);
  const result = {
    origTime,
    time: timeArr,
    rate: rateArr,
    convolve: convolveArr,
    stitch: stitchArr,
  };
  return result;
};
