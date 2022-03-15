import axios from "axios";

const API = axios.create({
   baseURL: "http://localhost:5000",
});

export const postFile = ({ file }) => {
   const data = new FormData();
   data.append("file", file);
   return API.post("/", data);
};
