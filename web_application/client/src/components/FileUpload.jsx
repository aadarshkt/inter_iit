import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Upload from '../assets/fileUpload.png'
import LaunchIcon from "@mui/icons-material/Launch";

const FileUpload = () => {
  return (
    <Box className="flex justify-center items-center -mt-10 h-screen w-full shadow-lg rounded">
      <Box
        className="flex flex-col justify-center items-center bg-white/50 w-2/3 rounded"
        style={{ boxShadow: "0 0 4px 4px white" }}
      >
        <Box className="flex justify-between items-center w-full px-5 py-4">
          <p className="text-5xl">Website Name</p>
          <a
            href="/"
            target="_blank"
            style={{ "backgroundColor": "#1976d2" }}
          >
            <Button className="text-lg" size="large" variant="contained" endIcon={<LaunchIcon />}>
              Manual
            </Button>
          </a>
        </Box>
        <img src={Upload} alt="fileUpload" className="w-1/3 h-1/2 py-5" />
        <p className="text-center text-3xl py-5">
          Select an input from the sidebar
        </p>
      </Box>
    </Box>
  );
};

export default FileUpload;
