import { Box, Center } from "@chakra-ui/react";
import styles from "./intersection-background.module.css";

interface Props {
  stoneColor: string;
  lastTurnNumber: number;
}

export function LastTurnNumberLabel(props: Props) {
  return (
    <Box
      height="100%"
      id="numbox"
      className={styles.lastTurnSvg}
      color={props.stoneColor}
    >
      <Center h="100%">{props.lastTurnNumber}</Center>
    </Box>
  );
}
