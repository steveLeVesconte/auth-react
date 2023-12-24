import { Box, SimpleGrid, GridItem } from "@chakra-ui/react";
import GameMoveButtons from "./game-move-buttons";
import CancelMoveButton from "./cancel-move-button";
//import { useGameArenaContext } from "../../../../contexts/game-arena-context";
import GameStatusMessage from "./game-status-message";
import { useGameStateStore } from "../../../../stores/game-state-store";

// interface Props {
//   //isPendingPass: boolean;
//   // onPlayConfirm: () => void;
//   // onPassConfirm: () => void;
//   // onPlayCancel: () => void;
//   // onPassCancel: () => void;
//   // onPass: () => void;
//   // isActiveGame: boolean;
//   // turnStutus: string;
//   // onResign: () => void;
// }

export const GameActionCard = () => {

  //const isPlayerTurn=useGameStateStore(state=>state.isPlayerTurn);
  const turnNumber=useGameStateStore(state=>state.turnNumber);
  // const updateTurnNumber=useGameStateStore(state=>state.updateTurnNumber);
  // const updateIsPlyerTurn=useGameStateStore(state=>state.updateIsPlayerTurn);
  // const onCancelAction=useGameStateStore(state=>state.onCancelAction);
  // const updateOnCancelAction=useGameStateStore(state=>state.updateOnCancelAction);
  // const onConfirmAction=useGameStateStore(state=>state.onConfirmAction);
  // const updateOnConfirmAction=useGameStateStore(state=>state.updateOnConfirmAction);
   const pendingAction = useGameStateStore(state=>state.pendingAction);
  // const updatPendingAction = useGameStateStore(state=>state.updatePendingAction);
  const lastAction=useGameStateStore(state=>state.lastAction);
  // const updatLastAction = useGameStateStore(state=>state.updateLastAction);
  



 // const {gameActionState,  turnState , boardState}=useGameArenaContext();

  // const isPendingMove = !(gameActionState?.pendingAction == null);
  // const isMyTurn = boardState?.isPlayersTurn ?? false;
  // const turnNumber = turnState?.turnNumber ?? -1;
  // const lastAction = turnState?.lastAction;
  const letters="ABCDEFGHIJKLMNOPQRS"
  return (
    <SimpleGrid gridTemplateColumns="1fr 1fr" gridTemplateRows="32px 32px" gap="10px">
      <GridItem>
      <GameMoveButtons
          //  isPendingMove={isPendingMove}
          //  isMyTurn={isMyTurn}
          /*   onPlayConfirm={props.onPlayConfirm}
            onPassConfirm={props.onPassConfirm} */
           // onPass={props.onPass}
          //  isActiveGame={props.isActiveGame}
           // isPendingPass={props.isPendingPass}
          />
      </GridItem>
      <GridItem>
      <CancelMoveButton
        //  isPendingMove={isPendingMove}
      //    isMyTurn={isMyTurn}
       //   onPlayCancel={props.onPlayCancel}
       //   onPassCancel={props.onPassCancel}
         // isPendingPass={props.isPendingPass}
        ></CancelMoveButton>
      </GridItem>
      <GridItem colSpan={2}>
        <GameStatusMessage></GameStatusMessage>
      </GridItem>
      <GridItem>     <Box width="100%">
        Turn: {turnNumber}
      </Box>
      </GridItem>
      <GridItem> <Box width="100%">Last Play:{" "} 
        {lastAction?.actionType === "pass" &&  <span>Pass</span>}
        {lastAction?.actionType === "play" &&  <span>{18-(lastAction?.location?.row??0)} {letters[lastAction.location?.col??0]}</span>}
      </Box></GridItem>
   
      <GridItem> <Box width="100%">Pending:{" "} 
      {(!pendingAction) &&  <span>none</span>}
      {pendingAction?.actionType === "pass" &&  <span>Pass</span>}
        {pendingAction?.actionType === "play" &&  <span>{18-(pendingAction?.location?.row??0)} {letters[pendingAction.location?.col??0]}</span>}
      </Box></GridItem>
    </SimpleGrid>
  );
 
};
