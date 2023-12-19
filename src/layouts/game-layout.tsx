import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/features/nav-bar/nav-bar";
import BoardContextProvider from "../components/features/game-arena/board-context";

const GameBoardLayout = () => {
  return (
    <>
      <div className="base-phone-grid">
        <div className="left-edge" />
        <Box className="game-board-layout">
          <NavBar />
          <BoardContextProvider >
          <Outlet></Outlet>
          </BoardContextProvider >
        </Box>

        <div className="right-edge" />
      </div>
    </>
  );
};

export default GameBoardLayout;
