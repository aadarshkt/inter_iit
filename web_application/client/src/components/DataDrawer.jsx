import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const drawerWidth = 540;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginRight: drawerWidth,
//   }),
// }));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight({ handleOpen, data, bgFlux }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    handleOpen(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    handleOpen(open);
  };

  // if(!open){
  //   console.log(document.getElementsByClassName(".MuiDrawer-docked"));
  //   document.getElementsByClassName(".MuiDrawer-docked")[0].styles.display="none";
  // }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <ArrowBackIosIcon />
          </IconButton> 
        </Toolbar>
      </AppBar> */}
      {open || (
        <Box
          className="flex items-center mr-2"
          sx={{ ...(open && { display: "none" }) }}
        >
          <Box
            className="bg-white text-2xl px-4 py-2 rounded-full"
            style={{ height: "fit-content" }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
            >
              <ArrowBackIosIcon className="text-3xl" />
            </IconButton>
          </Box>
        </Box>
      )}

      {open && (
        <>
          <Main open={open}>
            <DrawerHeader />
          </Main>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ArrowBackIosIcon />
                ) : (
                  <ArrowForwardIosIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            {JSON.stringify(data)}
            {<div>BGFLUX : {bgFlux}</div>}
          </Drawer>
        </>
      )}
    </Box>
  );
}
