import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/features/nav-bar/nav-bar";
import styles from "./game-arena-layout.module.css";

const GameArenaLayout = () => {
  return (
    <>
      <div className={styles.basePhoneGrid}>
        <div className={styles.leftEdge} />
        <Box>
          <NavBar />
          <Outlet></Outlet>
        </Box>
        <div className={styles.rightEdge} />
      </div>
    </>
  );
};

export default GameArenaLayout;
