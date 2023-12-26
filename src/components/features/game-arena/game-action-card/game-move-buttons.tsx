import { Button } from "@chakra-ui/react";
import { GameAction } from "../../../../services/data/turn-service";
import { useGameStateStore } from "../../../../stores/game-state-store";
import { ACTION_PASS, ACTION_STONE_PLAY } from "../../../../constants";

const GameMoveButtons = () => {
  const isPlayerTurn = useGameStateStore((state) => state.isPlayerTurn);
  const onConfirmAction = useGameStateStore((state) => state.onConfirmAction);
  const pendingAction = useGameStateStore((state) => state.pendingAction);
  const updatPendingAction = useGameStateStore(
    (state) => state.updatePendingAction
  );

  if (!isPlayerTurn) {
    return <div></div>;
  }

  if (isPlayerTurn && pendingAction?.actionType == ACTION_STONE_PLAY) {
    return (
      <Button
        onClick={() => {
          if (!(onConfirmAction == null)) {
            onConfirmAction(pendingAction);
          }
        }}
        colorScheme="green"
        size="sm"
        width="100%"
      >
        Confirm Stone Play
      </Button>
    );
  }

  if (isPlayerTurn && pendingAction?.actionType == ACTION_PASS) {
    return (
      <Button
        onClick={() => {
          if (!(onConfirmAction == null)) {
            onConfirmAction(pendingAction);
          }
        }}
        colorScheme="red"
        size="sm"
        width="100%"
      >
        Confirm Pass
      </Button>
    );
  }

  if (isPlayerTurn && !pendingAction) {
    return (
      <Button
        onClick={() =>
          updatPendingAction({
            actionType: ACTION_PASS,
            location: null,
          } as GameAction)
        }
        colorScheme="blue"
        size="sm"
        width="100%"
      >
        Pass
      </Button>
    );
  }
};

export default GameMoveButtons;
