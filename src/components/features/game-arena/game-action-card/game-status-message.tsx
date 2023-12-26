import { Alert } from "@chakra-ui/react";
import { useGameStateStore } from "../../../../stores/game-state-store";
import { AlertIcon } from "@chakra-ui/react";
import styles from "../players-card/players-card.module.css";
import { ACTION_PASS, ACTION_STONE_PLAY } from "../../../../constants";
const GameStatusMessage = () => {
  const pendingAction = useGameStateStore((state) => state.pendingAction);
  const isPlayerTurn = useGameStateStore((state) => state.isPlayerTurn);

  if (!isPlayerTurn) {
    return (
      <Alert status="info" variant="solid" className={styles.actionAlert}>
        <AlertIcon />
        Waiting for opponent to play.
      </Alert>
    );
  }

  if (isPlayerTurn && !pendingAction?.actionType) {
    return (
      <Alert status="success" variant="solid" className={styles.actionAlert}>
        <AlertIcon />
        Your turn to play
      </Alert>
    );
  }

  if (isPlayerTurn && pendingAction?.actionType == ACTION_STONE_PLAY) {
    return (
      <Alert status="warning" variant="solid" className={styles.actionAlert}>
        <AlertIcon />
        Please confirm your action
      </Alert>
    );
  }

  if (isPlayerTurn && pendingAction?.actionType == ACTION_PASS) {
    return (
      <Alert status="error" variant="solid" className={styles.actionAlert}>
        <AlertIcon />
        Please confirm pass!
      </Alert>
    );
  }
};

export default GameStatusMessage;
