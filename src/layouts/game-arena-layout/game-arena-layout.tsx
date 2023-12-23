import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/features/nav-bar/nav-bar";
import styles from "./game-arena-layout.module.css";
import GameArenaContextProvider from "../../contexts/game-arena-context";

const GameArenaLayout = () => {
  return (
    <>
      <div className={styles.basePhoneGrid}>
        <div className={styles.leftEdge} />
        <Box>
          <NavBar />
          <GameArenaContextProvider>
            <Outlet></Outlet>
          </GameArenaContextProvider>
        </Box>
        <div className={styles.rightEdge} />
      </div>
    </>
  );
};

export default GameArenaLayout;
