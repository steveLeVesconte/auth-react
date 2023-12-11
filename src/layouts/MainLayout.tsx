import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../pages/pages.css";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default MainLayout;
