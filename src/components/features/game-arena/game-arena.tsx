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
import {Text, Grid, GridItem, Button } from "@chakra-ui/react";
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
} from "../../../constants";
import { Players } from "./players-card/players";
//import { useGameArenaContext } from "../../../contexts/game-arena-context";
import {useGameStateStore} from '../../../stores/game-state-store'

const GameArena = () => {

  const isPlayerTurn=useGameStateStore(state=>state.isPlayerTurn);
  const turnNumber=useGameStateStore(state=>state.turnNumber);
  const updateTurnNumber=useGameStateStore(state=>state.updateTurnNumber);
  const updateIsPlyerTurn=useGameStateStore(state=>state.updateIsPlayerTurn);
  const onCancelAction=useGameStateStore(state=>state.onCancelAction);
  // const updateOnCancelAction=useGameStateStore(state=>state.updateOnCancelAction);
  // const onConfirmAction=useGameStateStore(state=>state.onConfirmAction);
  const updateOnConfirmAction=useGameStateStore(state=>state.updateOnConfirmAction);
  const pendingAction = useGameStateStore(state=>state.pendingAction);
  const updatPendingAction = useGameStateStore(state=>state.updatePendingAction);
  //const lastAction=useGameStateStore(state=>state.lastAction);
  const updatLastAction = useGameStateStore(state=>state.updateLastAction);
  
  

  // const { gameActionState, setGameActionState, setTurnState, setBoardState } =
  //   useGameArenaContext();
  //const [pendingPass, setPendingPass] = useState<boolean>(false);
  const [turn, setTurn] = useState<Turn>({} as Turn);
  const location = useLocation();
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const toast = useToast();

  /// TBD TBD TBD make page recover from no match in location
  useEffect(() => {
    updateOnConfirmAction(executeAction);

    //updatPendingAction(null);
    watchForLatestTurnForMatchId(location.state.match.id, handleTurnupdate);
  }, [pendingAction, location.state.match.id]);

  const handleTurnupdate = (latestTurn: Turn) => {
    console.log("in handleTurnupdate:");
    if (!player?.id) {
      console.log("in handleTurnupdate NO PLAYER ID:",player);
      return;
    }
    setTurn(latestTurn);

    console.log("in handleTurnupdate after setTurn:",turn);
  

    updateTurnNumber(latestTurn.turnNumber);
    updateIsPlyerTurn(utilities.getIsMyTurn(latestTurn, player));
    
  
    //updateOnConfirmAction(executeAction);
    updatLastAction(latestTurn.action);
    //updatPendingAction(null);

   // updateOnCancelAction(()=>void);
   // console.log('un set:' ,onCancelAction);


    // setBoardState({  isPlayersTurn: utilities.getIsMyTurn(latestTurn, player) });
    // setGameActionState({
    //   pendingAction: null,
    //   onGameAction: handleGameAction,
    //   onGameActionConfirm:executeAction,
    //   onCancelGameAction:cancelGameAction               
    // });
    // setTurnState({
    //   lastAction: latestTurn.action,
    //   turnNumber: latestTurn.turnNumber,
    // });
  };

  // const handleGameAction = (gameAction: GameAction): void => {

 
  //   updatPendingAction(gameAction);

  //   // setGameActionState({
  //   //   pendingAction: gameAction,
  //   //   onGameAction: handleGameAction,
  //   //   onGameActionConfirm:executeAction,
  //   //   onCancelGameAction:cancelGameAction                 
  //   // });
  //   console.log('in handle game action - gameAction: ',gameActionState?.pendingAction);
  // };

  // const cancelGameAction = () => {
  //   console.log('cancel action performed!! **********************************')
  //   setGameActionState({
  //     pendingAction: null,
  //     onGameAction: handleGameAction,
  //     onGameActionConfirm:executeAction,
  //     onCancelGameAction:cancelGameAction                 
  //   });
  // };

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

    // setGameActionState({
    //   pendingAction: null,
    //   onGameAction: handleGameAction,
    //   onGameActionConfirm:executeAction,
    //   onCancelGameAction:cancelGameAction                 
    // });
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



      // setGameActionState({
      //   pendingAction: null,
      //   onGameAction: handleGameAction,
      //   onGameActionConfirm:executeAction,
      //   onCancelGameAction:cancelGameAction                 
      // });
      // setBoardState({    isPlayersTurn: false  });

      // setTurnState({
      //   lastAction: newTurn.action,
      //   turnNumber: newTurn?.turnNumber ?? -1,
      // });

      toast({
        title: "Stone placment processed.",
        description: "Success.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  const executeAction = (actionToExecute:GameAction) => {
 
    console.log("in execute pending action:",pendingAction);
    console.log("in execute pending action:",actionToExecute);
    console.log("in execute pending action turn:",turn);
  
   // if (turn) {
      console.log("in execute pending turn:",turn);
 
      if (actionToExecute?.actionType == ACTION_STONE_PLAY) {
        console.log("in execute pending type stone play:");
 
        const submission: Submission = submissionFactory.createSubmission(
          turn,
          actionToExecute?.location?.row ?? -1,
          actionToExecute?.location?.col ?? -1
        );
        const evaluation = evaluateSubmission(submission);
        console.log("in execute pending type evaluation:", evaluation);
     
        if (evaluation.isLegalPlay) {
          handleLegalPlay(turn, submission, evaluation);
          console.log("in execute pending type LEGAL:", evaluation);
     
        } else {
          console.log("in execute pending type NOT LEGAL:", evaluation);
     
          handleIllegalPlay(evaluation);
        }
        // else{//    TBD   TBD   TBD      put alert here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  TBD
      }

      if (pendingAction?.actionType == ACTION_PASS) {
        console.log("in execute pending type pass:");
        const newTurn = turnFactory.createPassTurn(turn);
        console.log("in execute pending type pass new turn:", newTurn);
      
        setTurn(newTurn);
        addTurn(newTurn).then(() => {
          updateMatch(location.state.match, newTurn);

          updateTurnNumber(newTurn.turnNumber);
          updateIsPlyerTurn(false);
          
     
          updatLastAction(newTurn.action);
          updatPendingAction(null);
    
          

          // setBoardState({   isPlayersTurn: false });

          // setTurnState({
          //   lastAction: newTurn.action,
          //   turnNumber: newTurn?.turnNumber ?? -1,
          // });

          //setPendingPass(false);
          toast({
            title: "You Passed.",
            description: "Success.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        });
      }// end of if pass

   // }
    console.log("in execute pending action falling through:",turn);
  
  };

  //const noOp = () => {};
  if(turn?.id)
  return (
    <>
      <Grid className={styles.arenaGridContainer}>
        <GridItem className={styles.goboard} area={"goboard"}>
          {turn && (
            <GameBoardWithLabels boardString={turn?.resultState?.board ?? ""} />
          )}
        </GridItem>
        <GridItem className={styles.players} area={"players"}>
          <Players player={player} turn={turn} />
        </GridItem>
        <GridItem className={styles.actions} area={"actions"}>
          <GameActionCard
         /*    onPlayConfirm={executeAction}
            onPassConfirm={executeAction} */
            // onPass={() => {
            //   updatPendingAction({ actionType: ACTION_PASS, location: null });
            //   //handleGameAction({ actionType: ACTION_PASS, location: null });
            // }}
            // isActiveGame={location.state.match.status == MATCH_STATUS_ACTIVE}
            // //isPendingPass={pendingPass}
            // turnStutus="tbd - not used yet" // TBD future feature
            // onResign={noOp} // TBD future feature
            // onPassCancel={cancelGameAction}
            // onPlayCancel={cancelGameAction}
          />
        </GridItem>
        <GridItem className="chat">
          <Chat match={location.state.match}></Chat>
        </GridItem>
      </Grid>
      <Text>{isPlayerTurn.toString()} </Text>
      <Text>{turnNumber}</Text>
      <Text>[{pendingAction?.actionType}] {pendingAction?.location?.row.toString()}</Text>
    <Button onClick={()=>{if(onCancelAction) onCancelAction()}}>cancel</Button>
    </>
  );
};

export default GameArena;
