import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  Submission,
  evaluateSubmission,
} from "../../../services/moveProcessor";
import submissionFactory from "../../../services/submissionFactory";
import {
  PlayerContext,
  PlayerContextType,
} from "../../../contexts/PlayerContext";
import turnFactory from "../../../services/turnFactory";
import utilities from "../../../services/moveProcessor/UtilityFunctions";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import "../../GoArena/GoBoard.css";
import { useToast } from "@chakra-ui/react";
import {
  Turn,
  addTurn,
  watchForLatestTurnForMatchId,
} from "../../../services/turn-service";
import { updateMatch } from "../../../services/match-service";
import GameBoardWithLabels from "../../features/game-board-w-labels/game-board-w-labels";
import Chat from "../../features/chat/chat";
import { GameActionCard } from "./game-action-card/game-action-card";
import { PlayerCard } from "./players-card/player-card";
import { useBoardContext } from "./board-context";

const GameArena = () => {
  const { boardState, setBoardState } = useBoardContext();
  const [pendingPass, setPendingPass] = useState<boolean>(false);
  const [turn, setTurn] = useState<Turn | null>();
  const location = useLocation();
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const toast = useToast();

  /// TBD TBD TBD make page recover from no match in location
  useEffect(() => {
    watchForLatestTurnForMatchId(location.state.match.id, handleTurnupdate);
  }, [player]);

  const handleTurnupdate = (latestTurn: Turn) => {
    if (!player?.id) {
      return;
    }
    setTurn(latestTurn);
    setBoardState({
      pendingAction: null,
      lastAction: latestTurn.action,
      isPlayersTurn: utilities.getIsMyTurn(latestTurn, player),
      onSelectIntersection: handleSelectIntersection,
      turnNumber: latestTurn.turnNumber,
      isContext: true,
    });
  };

  const handleSelectIntersection = (row: number, col: number): void => {
    setBoardState({
      pendingAction: { actionType: "play", location: { row: row, col: col } },
      lastAction: boardState?.lastAction,
      isPlayersTurn: true, //  utilities.getIsMyTurn(turn, player),
      onSelectIntersection: handleSelectIntersection,
      turnNumber: turn?.turnNumber ?? -1,
      isContext: true,
    });
  };

  const executeStonePlay = () => {
    doStonePlay(
      turn,
      boardState?.pendingAction?.location?.row ?? -1,
      boardState?.pendingAction?.location?.col ?? -1
    );
  };

  const cancelStonePlay = () => {
    setBoardState({
      pendingAction: null,
      lastAction: boardState?.lastAction,
      isPlayersTurn: true, //  utilities.getIsMyTurn(turn, player),
      onSelectIntersection: handleSelectIntersection,
      turnNumber: turn?.turnNumber ?? -1,
      isContext: true,
    });
  };

  const doStonePlay = (
    turn: Turn | null | undefined,
    row: number,
    col: number
  ) => {
    if (turn) {
      const submission: Submission = submissionFactory.createSubmission(
        turn,
        row,
        col
      );
      const evaluation = evaluateSubmission(submission);
      if (evaluation.isLegalPlay) {
        const newTurn = turnFactory.createTurn(turn, evaluation, submission);
        setTurn(newTurn);
        addTurn(newTurn).then(() => {
          updateMatch(location.state.match, newTurn);
          setBoardState({
            pendingAction: null,
            lastAction: newTurn.action,
            isPlayersTurn: utilities.getIsMyTurn(newTurn, player),
            onSelectIntersection: handleSelectIntersection,
            turnNumber: turn?.turnNumber ?? -1,
            isContext: true,
          });

          toast({
            title: "Stone placment processed.",
            description: "Success.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        });
      } else {
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

        setBoardState({
          pendingAction: null,
          lastAction: boardState?.lastAction,
          isPlayersTurn: utilities.getIsMyTurn(turn, player),
          onSelectIntersection: handleSelectIntersection,
          turnNumber: turn?.turnNumber ?? -1,
          isContext: true,
        });
      }
      // else{//    TBD   TBD   TBD      put alert here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  TBD
    }
  };
  const noOp = () => {};
  const selectPass = (): void => {
    setPendingPass(true);
  };
  const cancelPass = (): void => {
    setPendingPass(false);
  };

  const handlePass = (turn: Turn | null | undefined) => {
    if (turn) {
      const newTurn = turnFactory.createPassTurn(turn);
      setTurn(newTurn);
      addTurn(newTurn).then(() => {
        updateMatch(location.state.match, newTurn);
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
  };

  return (
    <>
      <Grid className="arena-grid-container">
        <GridItem className="goboard" area={"goboard"}>
          {turn && (
            <GameBoardWithLabels
              boardString={turn?.resultState.board ?? ""}
              isMyTurn={utilities.getIsMyTurn(turn, player)} /*  TBD remove */
              onSelectIntersection={handleSelectIntersection} /*  TBD remove */
            />
          )}
        </GridItem>
        <GridItem className="players" area={"players"}>
          {/*    // TBDS serperate plaer box */}
          <Box className="player-box">
            <PlayerCard
              stoneColor={utilities.getStoneColorOfPlayer(
                player?.id ?? "",
                turn
              )}
              playerName={player?.name ?? ""}
              oppoenentName={utilities.getNameOfOpponent(
                player?.id ?? "",
                turn
              )}
              isMyTurn={utilities.getIsMyTurn(turn, player)}
              prisoners={utilities.getPrisonersOfCurrentPlayer(
                player?.id ?? "",
                turn
              )}
              isPlayer={true}
              onPass={() => handlePass(turn)} /*  TBD remove */
            />
          </Box>
          <Box className="player-box ">
            <PlayerCard
              stoneColor={utilities.getStoneColorOfOpponent(
                player?.id ?? "",
                turn
              )}
              playerName={utilities.getNameOfOpponent(player?.id ?? "", turn)}
              oppoenentName={player?.name ?? ""}
              isMyTurn={!utilities.getIsMyTurn(turn, player)}
              prisoners={utilities.getPrisonersOfOpponent(
                player?.id ?? "",
                turn
              )}
              isPlayer={false}
              onPass={() => noOp()} /*  TBD remove */
            />
          </Box>
        </GridItem>

        <GridItem className="actions" area={"actions"}>
          <GameActionCard
            isPendingMove={!(boardState?.pendingAction == null)}
            isMyTurn={utilities.getIsMyTurn(turn, player)} /*  TBD remove */
            onPlayConfirm={executeStonePlay}
            onPassConfirm={() => {
              handlePass(turn);
            }}
            onPass={selectPass}
            isActiveGame={location.state.match.status == "active"}
            isPendingPass={pendingPass}
            turnNumber={turn?.turnNumber ?? 0} /*  TBD remove */
            turnStutus="yada yada"
            onResign={noOp}
            onPassCancel={cancelPass}
            onPlayCancel={cancelStonePlay}
          />
        </GridItem>
        <GridItem className="chat">
          <Chat match={location.state.match}></Chat>
        </GridItem>
      </Grid>
      {boardState?.pendingAction && (
        <Box>{boardState?.pendingAction?.actionType}</Box>
      )}
    </>
  );
};

export default GameArena;
