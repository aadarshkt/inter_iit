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
import { postFile } from "../api";

const ALLOWED_EXTENSION = ["lc", "txt", "xls", "csv", "dat", "fits"];

const Sidebar = ({ state, toggleDrawer }) => {
   const [checked, setChecked] = useState(false);
   const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
   const [file, setFile] = useState(null);
   const [errorMessage, setErrorMessage] = useState("");

   const handlFileSubmit = async (e) => {
      e.preventDefault();
      if (!file) return setErrorMessage("File Not Selected");
      const res = await postFile({ file });
      console.log(res.data);
   };

   const handleChange = () => {
      setChecked(!checked);
   };

   const handleDateChange = (newDate) => {
      setValue(newDate);
      console.log(newDate);
   };

   const onDrop = useCallback((acceptedFiles) => {
      // Do something with the files

      setErrorMessage("");
      console.log(acceptedFiles[0].name.split(".").at(-1));
      if (
         !ALLOWED_EXTENSION.includes(acceptedFiles[0].name.split(".").at(-1))
      ) {
         setFile(null);
         return setErrorMessage(
            "File Should be in FITS:[*.lc,*.fits], XLS:[*.xls], ASCII:[*.dat,*.txt,*.csv] "
         );
      }
      setFile(acceptedFiles[0]);
      console.log(acceptedFiles);
   }, []);
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
   });

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
               <form
                  className="flex flex-col w-full h-full justify-center"
                  style={{
                     alignItems: "center",
                  }}
                  onSubmit={handlFileSubmit}
               >
                  <div
                     className="flex flex-col w-full h-full justify-center bg-black/10 w-80 p-6 rounded-lg"
                     {...getRootProps()}
                  >
                     <input
                        //  {...getInputProps()}
                        type="file"
                        name="file"
                        accept=".lc,.xls,.csv,.dat,.txt,.fits"
                        style={{ display: "none" }}
                     />
                     {isDragActive ? (
                        <p>Drop the files here ...</p>
                     ) : (
                        <p>
                           Drag 'n' drop some files here, or click to select
                           files
                        </p>
                     )}
                  </div>
                  {errorMessage && <div className="alert">{errorMessage}</div>}
                  <Button
                     className="bg-purple-600 mt-4 px-7"
                     variant="contained"
                     type="submit"
                  >
                     Submit
                  </Button>
               </form>
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
