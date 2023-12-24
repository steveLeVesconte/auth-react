import { Button } from '@chakra-ui/react'
import { useGameStateStore } from '../../../../stores/game-state-store';
//import { useGameArenaContext } from '../../../../contexts/game-arena-context';

// interface Props {
//   isPendingMove: boolean;
//   //isPendingPass: boolean;
//   isMyTurn: boolean;
//   onPlayCancel: () => void;
//   onPassCancel: () => void;
// }

const CancelMoveButton = () => {
  //const { gameActionState, setGameActionState, turnState, boardState } = useGameArenaContext();
 
  const isPlayerTurn=useGameStateStore(state=>state.isPlayerTurn);
  // const turnNumber=useGameStateStore(state=>state.turnNumber);
  // const updateTurnNumber=useGameStateStore(state=>state.updateTurnNumber);
  // const updateIsPlyerTurn=useGameStateStore(state=>state.updateIsPlayerTurn);
  // const onCancelAction=useGameStateStore(state=>state.onCancelAction);
  // const updateOnCancelAction=useGameStateStore(state=>state.updateOnCancelAction);
  // const onConfirmAction=useGameStateStore(state=>state.onConfirmAction);
  // const updateOnConfirmAction=useGameStateStore(state=>state.updateOnConfirmAction);
  const pendingAction = useGameStateStore(state=>state.pendingAction);
  const updatPendingAction = useGameStateStore(state=>state.updatePendingAction);
  // const lastAction=useGameStateStore(state=>state.lastAction);
  // const updatLastAction = useGameStateStore(state=>state.updateLastAction);


/*   if ((!props.isMyTurn)) {
    return (<Heading size="md">Waiting for opponent to play.</Heading>)
  }

  if ((props.isMyTurn) && (!props.isPendingPass) && (!props.isPendingMove)) {
    return (<Heading size="md" >Your turn to play</Heading>)
  } */
  if (isPlayerTurn && (pendingAction?.actionType=='play'))
 {
    return (
      <Button  onClick={()=>updatPendingAction(null)}
        colorScheme='orange' size="sm"  width="100%"  >Cancel Stone Play</Button>
    )
  }

  if (isPlayerTurn && (pendingAction?.actionType=='pass')) {
    return (
      <Button onClick={()=>updatPendingAction(null)} colorScheme='red' size="sm" width="100%" >Cancel Pass</Button>
    )
  }
}

export default CancelMoveButton
