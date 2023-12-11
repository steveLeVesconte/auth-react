import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const GameBoardLayout = () => {
  return (
    <>
      <div className="base-phone-grid">
        <div className="left-edge" />
        <Box className="game-board-layout">
          <NavBar />
          <Outlet></Outlet>
        </Box>

        <div className="right-edge" />
      </div>
    </>
  );
};

export default GameBoardLayout;
