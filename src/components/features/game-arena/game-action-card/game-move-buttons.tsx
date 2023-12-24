import { Button } from "@chakra-ui/react";
import { GameAction } from "../../../../services/data/turn-service";
import { useGameStateStore } from "../../../../stores/game-state-store";

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

  if (isPlayerTurn && pendingAction?.actionType == "play") {
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

  if (isPlayerTurn && pendingAction?.actionType == "pass") {
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
            actionType: "pass",
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
