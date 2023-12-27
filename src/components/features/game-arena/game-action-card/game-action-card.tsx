import { Box, SimpleGrid, GridItem, Card, CardBody } from "@chakra-ui/react";
import GameMoveButtons from "./game-move-buttons";
import CancelMoveButton from "./cancel-move-button";
import GameStatusMessage from "./game-status-message";
import { useGameStateStore } from "../../../../stores/game-state-store";
import styles from "./game-action-card.module.css";
import { ACTION_PASS, ACTION_STONE_PLAY } from "../../../../constants";

export const GameActionCard = () => {
  const turnNumber = useGameStateStore((state) => state.turnNumber);
  const lastAction = useGameStateStore((state) => state.lastAction);
  const letters = "ABCDEFGHJKLMNOPQRST";
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
            Last Play: {lastAction?.actionType === ACTION_PASS && <span>Pass</span>}
            {lastAction?.actionType === ACTION_STONE_PLAY && (
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
