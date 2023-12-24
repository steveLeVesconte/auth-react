import { Heading } from "@chakra-ui/react";
import { useGameStateStore } from "../../../../stores/game-state-store";

const GameStatusMessage = () => {
  const pendingAction = useGameStateStore((state) => state.pendingAction);
  const isPlayerTurn = useGameStateStore((state) => state.isPlayerTurn);

  if (!isPlayerTurn) {
    return <Heading size="md">Waiting for opponent to play.</Heading>;
  }

  if (isPlayerTurn && !pendingAction?.actionType) {
    return (
      <Heading size="md" textAlign="center">
        Your turn to play
      </Heading>
    );
  }

  if (isPlayerTurn && pendingAction?.actionType) {
    return <Heading size="md">Please confirm your action.</Heading>;
  }
};

export default GameStatusMessage;
