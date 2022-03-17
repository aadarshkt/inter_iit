import Papa from "papaparse";

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
