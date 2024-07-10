import { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#bcc4dc",
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        color: "white",
        padding: 3,
        gap: 3,
        boxSizing: "border-box",
        overflowY: "hidden",
        height: "100vh",
      }}
    >
      <Sidebar />
      <Box sx={{ width: "100%",
        // height: "inherit",
        height: "unset",
        overflowY: "scroll",

        margin: {
          xs: "unset",
          lg: "10px",
        },
        // border: "2px solid black" 
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",  // IE and Edge
        scrollbarWidth: "none",  // Firefox

        }}>{children}</Box>
    </Box>
  );
};

export default Layout;