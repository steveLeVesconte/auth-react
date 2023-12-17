import { Button } from '@chakra-ui/react'

interface Props {
  isPendingMove: boolean;
  isPendingPass: boolean;
  isMyTurn: boolean;
  onPlayConfirm: () => void;
  onPassConfirm: () => void;
  onPass: () => void;
  isActiveGame: boolean;
}

const GameMoveButtons = (props: Props) => {
  if (!props.isActiveGame) {
    return (<div></div>)
  }
  if (!props.isMyTurn) {
    return (<div></div>)
  }

  if (props.isMyTurn && (props.isPendingMove)) {
    return (
      <Button onClick={props.onPlayConfirm} colorScheme='green' size="sm"    >Confirm Stone Play</Button>
    )
  }

  if (props.isMyTurn && (props.isPendingPass)) {
    return (
      <Button onClick={props.onPassConfirm} colorScheme='red' size="sm"    >Confirm Pass</Button>
    )
  }

  if (props.isMyTurn && (!props.isPendingMove) && (!props.isPendingPass)) {
    return (
      <Button onClick={props.onPass} colorScheme='blue' size="sm"    >Pass</Button>
    )
  }
}

export default GameMoveButtons
