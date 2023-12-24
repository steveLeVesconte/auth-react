import { Button } from "@chakra-ui/react";
import { useGameStateStore } from "../../../../stores/game-state-store";

const CancelMoveButton = () => {
  const isPlayerTurn = useGameStateStore((state) => state.isPlayerTurn);
  const pendingAction = useGameStateStore((state) => state.pendingAction);
  const updatPendingAction = useGameStateStore(
    (state) => state.updatePendingAction
  );

  if (isPlayerTurn && pendingAction?.actionType == "play") {
    return (
      <Button
        onClick={() => updatPendingAction(null)}
        colorScheme='gray'
        size="sm"
        width="100%"
      >
        Cancel Stone Play
      </Button>
    );
  }

  if (isPlayerTurn && pendingAction?.actionType == "pass") {
    return (
      <Button
        onClick={() => updatPendingAction(null)}
        colorScheme='gray'
        size="sm"
        width="100%"
      >
        Cancel Pass
      </Button>
    );
  }
};

export default CancelMoveButton;
