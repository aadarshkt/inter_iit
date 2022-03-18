import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useDropzone } from "react-dropzone";
import { postFile } from "../api/index";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

const ALLOWED_EXTENSION = ["lc", "txt", "xls", "csv", "dat", "fits"];

//Tab Panel props
function TabPanel(props) {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
   );
}

const a11yProps = (index) => {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
};

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

const Sidebar = ({
   state,
   toggleDrawer,
   closeDrawer,
   chartResults,
   peakResults,
   setIsLoading,
   handleBgFlux,
}) => {
   const [file, setFile] = useState(null);
   const [errorMessage, setErrorMessage] = useState("");
   const [tabIndex, setTabIndex] = React.useState(0);

   //tabs index handling
   const handleTabIndex = (event, newValue) => {
      setTabIndex(newValue);
   };

   //function called on submit
   const handleFileSubmit = async (e) => {
      e.preventDefault();
      if (!file) return setErrorMessage("File Not Selected");
      setIsLoading(true);
      closeDrawer(`left`, false);
      try {
         const res = await postFile({ file });
         await peakResults(res.data);
         await chartResults(res.data);
         handleBgFlux(res.data.backgroundflux);
      } catch (error) {
         setErrorMessage(`${error.errorMessage}`);
      } finally {
         setIsLoading(false);
      }
   };

   //dropzone function when file is dropped
   const onDrop = useCallback((acceptedFiles) => {
      setErrorMessage("");
      if (
         !ALLOWED_EXTENSION.includes(acceptedFiles[0].name.split(".").at(-1))
      ) {
         setFile(null);
         return setErrorMessage(
            "File Should be in FITS:[*.lc,*.fits], XLS:[*.xls], ASCII:[*.dat,*.txt,*.csv] "
         );
      }
      setFile(acceptedFiles[0]);
   }, []);
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
   });

   const list = (anchor) => (
      <Box
         sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
         role="presentation"
         className="h-2/3"
      >
         <div className="flex items-center w-full justify-center pt-2">
            <Tabs value={tabIndex} onChange={handleTabIndex}>
               <Tab label="Upload FIle" {...a11yProps(1)} />
            </Tabs>
         </div>
         <div className="flex flex-col justify-start p-5 h-full">
            <TabPanel value={tabIndex} index={0} className="h-full">
               <form
                  className="flex flex-col w-full h-full justify-center"
                  onSubmit={handleFileSubmit}
               >
                  <p className="mb-5 text-xl text-center w-full">
                     Upload file to get analysis
                  </p>
                  <div
                     className="flex flex-col w-full h-full justify-center bg-black/10 p-6 rounded-lg text-2xl text-center"
                     {...getRootProps()}
                  >
                     <input
                        {...getInputProps()}
                        type="file"
                        name="file"
                        accept=".lc,.xls,.csv,.dat,.txt,.fits"
                        style={{ display: "none" }}
                     />
                     {isDragActive ? (
                        <p>Drop the files here ...</p>
                     ) : !file ? (
                        <p>
                           Drag 'n' drop some files here, or click to select
                           files
                        </p>
                     ) : (
                        <p>{file.name}</p>
                     )}
                  </div>
                  {errorMessage && (
                     <div className="alert">
                        <p className=" pt-5 text-xl text-center w-full">
                           {errorMessage}
                        </p>
                     </div>
                  )}
                  <div className="flex justify-center">
                     <Button
                        className="bg-purple-600 w-1/2 rounded-lg text-xl mt-4 p-3"
                        variant="contained"
                        type="submit"
                     >
                        Submit
                     </Button>
                  </div>
               </form>
            </TabPanel>
         </div>
      </Box>
   );

   return (
      <div>
         <React.Fragment key={`left`}>
            <Button
               className={`text-white bg-white/20 rounded-xl hover:bg-white/50`}
               onClick={toggleDrawer(`left`, true)}
            >
               <MenuIcon className="text-white border-white" />
            </Button>
            <Drawer
               anchor="left"
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
