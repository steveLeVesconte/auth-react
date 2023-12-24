import { Box, SimpleGrid, GridItem, Card, CardBody } from "@chakra-ui/react";
import GameMoveButtons from "./game-move-buttons";
import CancelMoveButton from "./cancel-move-button";
import GameStatusMessage from "./game-status-message";
import { useGameStateStore } from "../../../../stores/game-state-store";
import styles from "./game-action-card.module.css";

export const GameActionCard = () => {
  const turnNumber = useGameStateStore((state) => state.turnNumber);
  const lastAction = useGameStateStore((state) => state.lastAction);
  const letters = "ABCDEFGHIJKLMNOPQRS";
  return (
    <SimpleGrid className={styles.gameActionCardGrid}>
      <GridItem>
        <GameMoveButtons />
      </GridItem>
      <GridItem>
        <CancelMoveButton></CancelMoveButton>
      </GridItem>
      <GridItem colSpan={2}>
        <GameStatusMessage></GameStatusMessage>
      </GridItem>
      <GridItem>
        <Card h="100%">
          <CardBody p="5px">
            {" "}
            <Box width="100%">Turn: {turnNumber}</Box>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card h="100%">
          <CardBody p="5px">
            Last Play: {lastAction?.actionType === "pass" && <span>Pass</span>}
            {lastAction?.actionType === "play" && (
              <span>
                {18 - (lastAction?.location?.row ?? 0)}{" "}
                {letters[lastAction.location?.col ?? 0]}
              </span>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </SimpleGrid>
  );
};
