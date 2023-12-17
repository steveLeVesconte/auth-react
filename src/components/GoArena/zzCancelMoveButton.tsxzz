import { Button, Heading } from '@chakra-ui/react'

interface Props {
  isPendingMove: boolean;
  isPendingPass: boolean;
  isMyTurn: boolean;
  onPlayCancel: () => void;
  onPassCancel: () => void;
}

const GameMoveButton = (props: Props) => {
  if ((!props.isMyTurn)) {
    return (<Heading size="md">Waiting for opponent to play.</Heading>)
  }

  if ((props.isMyTurn) && (!props.isPendingPass) && (!props.isPendingMove)) {
    return (<Heading size="md" >Your turn to play</Heading>)
  }
  if (props.isMyTurn && (props.isPendingMove)) {
    return (
      <Button onClick={props.onPlayCancel} colorScheme='orange' size="sm"    >Cancel Stone Play</Button>
    )
  }

  if (props.isMyTurn && (props.isPendingPass)) {
    return (
      <Button onClick={props.onPassCancel} colorScheme='red' size="sm" >Cancel Pass</Button>
    )
  }
}

export default GameMoveButton
