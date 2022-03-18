import Papa from "papaparse";

//converts peak related data into required object
export const parsePeakCSV = (csv) => {
  //params for each peak
  let catClass = []; //category class
  let decayTime = []; //category class
  let riseTime = []; //category class
  let peakFlux = []; //category class
  let peakArr = []; //category class
  let startArr = []; //category class
  let endArr = []; //category class

  const obj = Papa.parse(csv.peakParams); //converts csv to object of arrays

  obj.data.forEach((value, index) => {
    if (index !== 0 && index !== obj.data.length - 1) {
      catClass.push(value[0]);
      decayTime.push(value[1]);
      riseTime.push(value[2]);
      peakFlux.push(value[3]);
      peakArr.push(value[4]);
      startArr.push(value[5]);
      endArr.push(value[6]);
    }
  });
  const result = {
    catClass,
    decayTime,
    riseTime,
    peakFlux,
    peakArr,
    startArr,
    endArr,
  };
  return result;
};

//converts chart related data into required object
export const parseCSV = (csv) => {
  //params to plot curve
  let timeArr = [];
  let origTime = [];
  let rateArr = [];
  let convolveArr = [];
  let stitchArr = [];

  const obj = Papa.parse(csv.curveData); //converts csv to object of arrays

  obj.data.forEach((value, index) => {
    origTime.push(value[0]);
    if (index !== 0 && index % 50 === 0) { //taking time in intervals of 50 to reduce overload of data
      timeArr.push(value[0]);
      rateArr.push(value[1]);
      convolveArr.push(value[2]);
      stitchArr.push(value[3]);
    }
  });
  const result = {
    origTime,
    time: timeArr,
    rate: rateArr,
    convolve: convolveArr,
    stitch: stitchArr,
  };
  return result;
};
