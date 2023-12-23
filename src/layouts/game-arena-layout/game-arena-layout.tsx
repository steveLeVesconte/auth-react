import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/features/nav-bar/nav-bar";
import BoardContextProvider from "../../components/features/game-arena/board-context";
import styles from "./game-arena-layout.module.css";
import GameActionContextProvider from "../../contexts/game-action-context";
import TurnStateContextProvider from "../../contexts/turn-state-context";

const GameArenaLayout = () => {
  return (
    <>
      <div className={styles.basePhoneGrid}>
        <div className={styles.leftEdge} />
        <Box >
          <NavBar />
          <BoardContextProvider >
            <GameActionContextProvider>
              <TurnStateContextProvider>
          <Outlet></Outlet>
          </TurnStateContextProvider>
          </GameActionContextProvider>
          </BoardContextProvider >
        </Box>
        <div className={styles.rightEdge} />
      </div>
    </>
  );
};

export default GameArenaLayout;
