import axios from "axios";

const API = axios.create({
   baseURL: "http://localhost:5000",
});

export const postFile = ({ file, fileName }) => {
   console.log(file);
   const data = new FormData();
   data.append("file", file);
   data.append("fileName", fileName);
   return API.post("/", data);
};
