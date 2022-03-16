import Papa from "papaparse";

export const parseCSV = (csv) => {
  let xArr = [];
  let yArr = [];
  const obj = Papa.parse(csv);
  obj.data.forEach((value, index) => {
    if (index !== 0 && index % 50 === 0) {
      xArr.push(value[0]);
      yArr.push(value[1]);
    }
  });
  const result = {
    x: xArr,
    y: yArr,
  };
  return result;
};
