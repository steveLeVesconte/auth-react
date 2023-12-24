import { Navigate, useLocation} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  BaseSubmissionResult,
  Submission,
  evaluateSubmission,
} from "../../../services/moveProcessor";
import submissionFactory from "../../../services/factories/submission-factory";
import {
  PlayerContext,
  PlayerContextType,
} from "../../../contexts/PlayerContext";
import turnFactory from "../../../services/factories/turn-factory";
import utilities from "../../../services/moveProcessor/UtilityFunctions";
import { Grid, GridItem } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  GameAction,
  Turn,
  addTurn,
  watchForLatestTurnForMatchId,
} from "../../../services/data/turn-service";
import { updateMatch } from "../../../services/data/match-service";
import GameBoardWithLabels from "../../features/game-board-w-labels/game-board-w-labels";
import Chat from "../../features/chat/chat";
import { GameActionCard } from "./game-action-card/game-action-card";
import styles from "./game-arena.module.css";
import { ACTION_PASS, ACTION_STONE_PLAY } from "../../../constants";
import { Players } from "./players-card/players";
import { useGameStateStore } from "../../../stores/game-state-store";

const GameArena = () => {
  const updateTurnNumber = useGameStateStore((state) => state.updateTurnNumber);
  const updateIsPlyerTurn = useGameStateStore(
    (state) => state.updateIsPlayerTurn
  );
  const updateOnConfirmAction = useGameStateStore(
    (state) => state.updateOnConfirmAction
  );
  const pendingAction = useGameStateStore((state) => state.pendingAction);
  const updatPendingAction = useGameStateStore(
    (state) => state.updatePendingAction
  );
  const updatLastAction = useGameStateStore((state) => state.updateLastAction);

  const [turn, setTurn] = useState<Turn>({} as Turn);
  const location = useLocation();
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const toast = useToast();

  useEffect(() => {
    watchForLatestTurnForMatchId(location?.state?.match?.id, handleTurnupdate);
  }, [pendingAction]);

  const handleTurnupdate = (latestTurn: Turn|null) => {
    if (!latestTurn) {
      return;
    }

    if (!player?.id) {
      return;
    }
    setTurn(latestTurn);
    updateTurnNumber(latestTurn.turnNumber);
    updateIsPlyerTurn(utilities.getIsMyTurn(latestTurn, player));
    updatLastAction(latestTurn.action);
  };

  const handleIllegalPlay = (evaluation: BaseSubmissionResult) => {
    let reason = "unknown";
    if (evaluation.isKo) {
      reason = "Ko Rule Violation!";
    }
    if (evaluation.isSuicide) {
      reason = "Suiside Rule Violation!";
    }
    toast({
      title: "Illegal Move.",
      description: reason,
      status: "error",
      duration: 9000,
      isClosable: true,
    });

    updatPendingAction(null);
  };

  const handleLegalPlay = (
    turn: Turn,
    submission: Submission,
    evaluation: BaseSubmissionResult
  ) => {
    const newTurn = turnFactory.createTurn(turn, evaluation, submission);
    setTurn(newTurn);
    addTurn(newTurn).then(() => {
      updateMatch(location.state.match, newTurn);
      updateTurnNumber(newTurn.turnNumber);
      updateIsPlyerTurn(false);
      updatLastAction(newTurn.action);
      updatPendingAction(null);

      toast({
        title: "Stone placment processed.",
        description: "Success.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  const executeAction = (actionToExecute: GameAction) => {
    if (actionToExecute?.actionType == ACTION_STONE_PLAY) {
      const submission: Submission = submissionFactory.createSubmission(
        turn,
        actionToExecute?.location?.row ?? -1,
        actionToExecute?.location?.col ?? -1
      );
      const evaluation = evaluateSubmission(submission);
      if (evaluation.isLegalPlay) {
        handleLegalPlay(turn, submission, evaluation);
      } else {
        handleIllegalPlay(evaluation);
      }
      // else{//    TBD   TBD   TBD      put alert here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  TBD
    }

    if (pendingAction?.actionType == ACTION_PASS) {
      const newTurn = turnFactory.createPassTurn(turn);
      setTurn(newTurn);
      addTurn(newTurn).then(() => {
        updateMatch(location.state.match, newTurn);
        updateTurnNumber(newTurn.turnNumber);
        updateIsPlyerTurn(false);
        updatLastAction(newTurn.action);
        updatPendingAction(null);
        toast({
          title: "You Passed.",
          description: "Success.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
    }
  };
  updateOnConfirmAction(executeAction);
  if ((!player?.id) || (!location?.state?.match?.id)) {
    return <Navigate to="/" />;
  }


if (turn?.id)
    return (
      <>
        <Grid className={styles.arenaGridContainer}>
          <GridItem className={styles.goboard} area={"goboard"}>
            {turn && (
              <GameBoardWithLabels
                boardString={turn?.resultState?.board ?? ""}
              />
            )}
          </GridItem>
          <GridItem className={styles.players} area={"players"}>
            <Players player={player} turn={turn} />
          </GridItem>
          <GridItem className={styles.actions} area={"actions"}>
            <GameActionCard />
          </GridItem>
          <GridItem className="chat">
            <Chat match={location.state.match}></Chat>
          </GridItem>
        </Grid>
      </>
    );
};

export default GameArena;
