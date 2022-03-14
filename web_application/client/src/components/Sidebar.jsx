import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";
import { useDropzone } from "react-dropzone";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";

const Sidebar = ({ state, toggleDrawer }) => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleDateChange = (newDate) => {
    setValue(newDate);
    console.log(newDate);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
    >
      <p className="font-bold w-full text-center p-5">Input</p>
      <div className="flex items-center w-full justify-center">
        <div className="flex justify-end w-1/2">
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        {checked ? (
          <p className="w-1/2">Upload File</p>
        ) : (
          <p className="w-1/2">Date</p>
        )}
      </div>
      <div className="flex flex-col items-center p-5 h-full justify-end">
        {checked ? (
          <div
            className="flex flex-col w-full h-full justify-center bg-black/10 m-5 p-10 rounded-lg"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col h-full justify-end">
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button className="bg-purple-600 mt-5" variant="contained">
              Submit
            </Button>
          </div>
        )}
      </div>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={`left`}>
        <Button
          className={`text-white bg-white/50 rounded-xl hover:bg-white/50`}
          onClick={toggleDrawer(`left`, true)}
        >
          <MenuIcon className="text-white border-white" />
        </Button>
        <Drawer
          anchor="right"
          open={state[`left`]}
          onClose={toggleDrawer(`left`, false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Sidebar;
