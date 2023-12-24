import { Box, SimpleGrid, GridItem } from "@chakra-ui/react";
import GameMoveButtons from "./game-move-buttons";
import CancelMoveButton from "./cancel-move-button";
import GameStatusMessage from "./game-status-message";
import { useGameStateStore } from "../../../../stores/game-state-store";

export const GameActionCard = () => {
  const turnNumber = useGameStateStore((state) => state.turnNumber);
  const pendingAction = useGameStateStore((state) => state.pendingAction);
  const lastAction = useGameStateStore((state) => state.lastAction);
  const letters = "ABCDEFGHIJKLMNOPQRS";
  return (
    <SimpleGrid
      gridTemplateColumns="1fr 1fr"
      gridTemplateRows="32px 32px"
      gap="10px"
    >
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
        {" "}
        <Box width="100%">Turn: {turnNumber}</Box>
      </GridItem>
      <GridItem>
        {" "}
        <Box width="100%">
          Last Play: {lastAction?.actionType === "pass" && <span>Pass</span>}
          {lastAction?.actionType === "play" && (
            <span>
              {18 - (lastAction?.location?.row ?? 0)}{" "}
              {letters[lastAction.location?.col ?? 0]}
            </span>
          )}
        </Box>
      </GridItem>

      <GridItem>
        {" "}
        <Box width="100%">
          Pending: {!pendingAction && <span>none</span>}
          {pendingAction?.actionType === "pass" && <span>Pass</span>}
          {pendingAction?.actionType === "play" && (
            <span>
              {18 - (pendingAction?.location?.row ?? 0)}{" "}
              {letters[pendingAction.location?.col ?? 0]}
            </span>
          )}
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};
