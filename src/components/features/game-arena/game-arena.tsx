import { useLocation } from "react-router-dom";
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
import {
  ACTION_PASS,
  ACTION_STONE_PLAY,
  MATCH_STATUS_ACTIVE,
} from "../../../constants";
import { Players } from "./players-card/players";
import { useGameArenaContext } from "../../../contexts/game-arena-context";

const GameArena = () => {
  const { gameActionState, setGameActionState, setTurnState, setBoardState } =
    useGameArenaContext();
  const [pendingPass, setPendingPass] = useState<boolean>(false);
  const [turn, setTurn] = useState<Turn | null>();
  const location = useLocation();
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const toast = useToast();

  /// TBD TBD TBD make page recover from no match in location
  useEffect(() => {
    watchForLatestTurnForMatchId(location.state.match.id, handleTurnupdate);
  }, []);

  const handleTurnupdate = (latestTurn: Turn) => {
    if (!player?.id) {
      return;
    }
    setTurn(latestTurn);
    setBoardState({  isPlayersTurn: utilities.getIsMyTurn(latestTurn, player) });
    setGameActionState({
      pendingAction: null,
      onGameAction: handleGameAction,
    });
    setTurnState({
      lastAction: latestTurn.action,
      turnNumber: latestTurn.turnNumber,
    });
  };

  const handleGameAction = (gameAction: GameAction): void => {
    setGameActionState({
      pendingAction: gameAction,
      onGameAction: handleGameAction,
    });
  };

  const cancelGameAction = () => {
    setGameActionState({
      pendingAction: null,
      onGameAction: handleGameAction,
    });
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

    setGameActionState({
      pendingAction: null,
      onGameAction: handleGameAction,
    });
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
      setGameActionState({
        pendingAction: null,
        onGameAction: handleGameAction,
      });
      setBoardState({    isPlayersTurn: false  });

      setTurnState({
        lastAction: newTurn.action,
        turnNumber: newTurn?.turnNumber ?? -1,
      });

      toast({
        title: "Stone placment processed.",
        description: "Success.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  const executeAction = () => {
    if (turn) {
      if (gameActionState?.pendingAction?.actionType == ACTION_STONE_PLAY) {
        const submission: Submission = submissionFactory.createSubmission(
          turn,
          gameActionState?.pendingAction?.location?.row ?? -1,
          gameActionState?.pendingAction?.location?.col ?? -1
        );
        const evaluation = evaluateSubmission(submission);
        if (evaluation.isLegalPlay) {
          handleLegalPlay(turn, submission, evaluation);
        } else {
          handleIllegalPlay(evaluation);
        }
        // else{//    TBD   TBD   TBD      put alert here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  TBD
      }

      if (gameActionState?.pendingAction?.actionType == ACTION_PASS) {
        const newTurn = turnFactory.createPassTurn(turn);
        setTurn(newTurn);
        addTurn(newTurn).then(() => {
          updateMatch(location.state.match, newTurn);
          setBoardState({   isPlayersTurn: false });

          setTurnState({
            lastAction: newTurn.action,
            turnNumber: newTurn?.turnNumber ?? -1,
          });

          setPendingPass(false);
          toast({
            title: "You Passed.",
            description: "Success.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        });
      }
    }
  };

  const noOp = () => {};

  return (
    <>
      <Grid className={styles.arenaGridContainer}>
        <GridItem className={styles.goboard} area={"goboard"}>
          {turn && (
            <GameBoardWithLabels boardString={turn?.resultState.board ?? ""} />
          )}
        </GridItem>
        <GridItem className={styles.players} area={"players"}>
          <Players player={player} turn={turn} />
        </GridItem>
        <GridItem className={styles.actions} area={"actions"}>
          <GameActionCard
            onPlayConfirm={executeAction}
            onPassConfirm={executeAction}
            onPass={() => {
              handleGameAction({ actionType: ACTION_PASS, location: null });
            }}
            isActiveGame={location.state.match.status == MATCH_STATUS_ACTIVE}
            isPendingPass={pendingPass}
            turnStutus="tbd - not used yet" // TBD future feature
            onResign={noOp} // TBD future feature
            onPassCancel={cancelGameAction}
            onPlayCancel={cancelGameAction}
          />
        </GridItem>
        <GridItem className="chat">
          <Chat match={location.state.match}></Chat>
        </GridItem>
      </Grid>
    </>
  );
};

export default GameArena;
