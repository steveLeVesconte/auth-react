import {  Heading } from '@chakra-ui/react'
import { useGameArenaContext } from '../../../../contexts/game-arena-context';



const GameStatusMessage = () => {
  const { gameActionState, turnState, boardState } = useGameArenaContext();
  if ((!boardState?.isPlayersTurn)) {
    return (<Heading size="md"  >Waiting for opponent to play.</Heading>)
  }

  if ((boardState?.isPlayersTurn) && (!gameActionState?.pendingAction) ) {
    return (<Heading size="md" textAlign="center" >Your turn to play</Heading>)
  }
  if ((boardState?.isPlayersTurn) && (gameActionState?.pendingAction) ) {
    return (<Heading size="md" >Please confirm your action.</Heading>)
  }

  
}

export default GameStatusMessage
