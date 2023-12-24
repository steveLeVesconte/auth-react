import { Button } from '@chakra-ui/react'
//import { useGameArenaContext } from '../../../../contexts/game-arena-context';
import { GameAction } from '../../../../services/data/turn-service';
import { useGameStateStore } from '../../../../stores/game-state-store';

//interface Props {
//   isPendingMove: boolean;
//  // isPendingPass: boolean;
//   isMyTurn: boolean;
/*   onPlayConfirm: () => void;
  onPassConfirm: () => void; */
  // onPass: () => void;
  // isActiveGame: boolean;
//}

const GameMoveButtons = () => {
  const isPlayerTurn=useGameStateStore(state=>state.isPlayerTurn);
  // const turnNumber=useGameStateStore(state=>state.turnNumber);
  // const updateTurnNumber=useGameStateStore(state=>state.updateTurnNumber);
  // const updateIsPlyerTurn=useGameStateStore(state=>state.updateIsPlayerTurn);
  // const onCancelAction=useGameStateStore(state=>state.onCancelAction);
  // const updateOnCancelAction=useGameStateStore(state=>state.updateOnCancelAction);
  const onConfirmAction=useGameStateStore(state=>state.onConfirmAction);
  // const updateOnConfirmAction=useGameStateStore(state=>state.updateOnConfirmAction);
  const pendingAction = useGameStateStore(state=>state.pendingAction);
  const updatPendingAction = useGameStateStore(state=>state.updatePendingAction);
  // const lastAction=useGameStateStore(state=>state.lastAction);
  // const updatLastAction = useGameStateStore(state=>state.updateLastAction);
  


  //const { gameActionState, turnState, boardState } = useGameArenaContext();
 
  
  // if (!props.isActiveGame) {
  //   return (<div></div>)
  // }
  if (!isPlayerTurn) {
    return (<div></div>)
  }

  if (isPlayerTurn && (pendingAction?.actionType=='play')) {
    return (
      <Button onClick={ ()=>{if(!(onConfirmAction==null)){
        console.log('calling confirm action for play: ', pendingAction);
        onConfirmAction( pendingAction);
      }}} 
      colorScheme='green' size="sm" width="100%"   >Confirm Stone Play</Button>
    )
  }

  if (isPlayerTurn && (pendingAction?.actionType=='pass')) {
    return (
      <Button onClick={ ()=>{if(!(onConfirmAction==null)){
        console.log('calling confirm action for pass: ', pendingAction);
        onConfirmAction( pendingAction);
      }}}  colorScheme='red' size="sm" width="100%"   >Confirm Pass</Button>
    )
  }

if (isPlayerTurn && (!pendingAction)) {
    return (
      <Button onClick={()=>updatPendingAction(
        {actionType:"pass",
      location:null} as GameAction
      )} colorScheme='blue' size="sm"  width="100%"  >Pass</Button>
    )
  }
}

export default GameMoveButtons
