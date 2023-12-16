import { useLocation } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { Submission, evaluateSubmission } from "../../services/moveProcessor";
import submissionFactory from "../../services/submissionFactory";
import { PlayerContext, PlayerContextType } from "../../contexts/PlayerContext";
import turnFactory from "../../services/turnFactory";
import utilities from "../../services/moveProcessor/UtilityFunctions";
import GoGameBoard from "./GoGameBoard";
import Chat from "../Chat";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import "./GoBoard.css";
import { PlayerCard } from "./PlayerCard";
import { ActionCard } from "./ActionCard";
import { useToast } from "@chakra-ui/react";
import {
  GameAction,
  Turn,
  addTurn,
  watchForLatestTurnForMatchId,
} from "../../services/turn-service";
import { updateMatch } from "../../services/match-service";

export interface ContextPackage {
  pendingAction: GameAction | null | undefined;
  lastAction: GameAction | null | undefined;
  isPlayersTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
}
const emptyPackage: ContextPackage = {
  pendingAction: null,
  lastAction: null,
  isPlayersTurn: false,
  onSelectIntersection: function (): void {},
};

export const StoneContext = createContext(emptyPackage);
const GoArena = () => {
  const [contextPackage, setContextPackage] =
    useState<ContextPackage>(emptyPackage);
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
    setTurn(latestTurn);
    setContextPackage({
      pendingAction: null,
      lastAction: latestTurn.action,
      isPlayersTurn: utilities.getIsMyTurn(turn, player),
      onSelectIntersection: handleSelectIntersection,
    });
  };

  const handleSelectIntersection = (row: number, col: number): void => {
    const newStoneContext: ContextPackage = {
      pendingAction: { actionType: "play", location: { row: row, col: col } },
      lastAction: contextPackage?.lastAction,
      isPlayersTurn: utilities.getIsMyTurn(turn, player),
      onSelectIntersection: handleSelectIntersection,
    };
    setContextPackage(newStoneContext);
  };

  const executeStonePlay = () => {
    doStonePlay(
      turn,
      contextPackage.pendingAction?.location?.row ?? -1,
      contextPackage.pendingAction?.location?.col ?? -1
    );
  };

  const cancelStonePlay = () => {
    const newStoneContext: ContextPackage = {
      pendingAction: null,
      lastAction: contextPackage?.lastAction,
      isPlayersTurn: utilities.getIsMyTurn(turn, player),
      onSelectIntersection: handleSelectIntersection,
    };
    setContextPackage(newStoneContext);
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
          const newStoneContext: ContextPackage = {
            pendingAction: null,
            lastAction: newTurn.action,
            isPlayersTurn: utilities.getIsMyTurn(turn, player),
            onSelectIntersection: handleSelectIntersection,
          };
          setContextPackage(newStoneContext);
          console.log("about to toast");
          toast({
            title: "Stone placment processed.",
            description: "Success.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        });
      } else {
        console.log("about to toast error");
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
        const newStoneContext: ContextPackage = {
          pendingAction: null,
          lastAction: contextPackage?.lastAction,
          isPlayersTurn: utilities.getIsMyTurn(turn, player),
          onSelectIntersection: handleSelectIntersection,
        };
        setContextPackage(newStoneContext);
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
      <StoneContext.Provider value={contextPackage}>
        <Grid className="arena-grid-container">
          <GridItem className="goboard" area={"goboard"}>
            <div>
              {turn && (
                <GoGameBoard
                  boardString={turn?.resultState.board ?? ""}
                  isMyTurn={utilities.getIsMyTurn(turn, player)}
                  onSelectIntersection={handleSelectIntersection}
           
                />
              )}
            </div>
          </GridItem>
          <GridItem className="players" area={"players"}>
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
                onPass={() => handlePass(turn)}
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
                onPass={() => noOp()}
              />
            </Box>
          </GridItem>

          <GridItem className="actions" area={"actions"}>
            <ActionCard
              isPendingMove={!(contextPackage?.pendingAction == null)}
              isMyTurn={utilities.getIsMyTurn(turn, player)}
              onPlayConfirm={executeStonePlay}
              onPassConfirm={() => {
                handlePass(turn);
              }}
              onPass={selectPass}
              isActiveGame={location.state.match.status == "active"}
              isPendingPass={pendingPass}
              turnNumber={turn?.turnNumber ?? 0}
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
        {contextPackage?.pendingAction && (
          <Box>{contextPackage?.pendingAction?.actionType}</Box>
        )}
      </StoneContext.Provider>
    </>
  );
};

export default GoArena;
