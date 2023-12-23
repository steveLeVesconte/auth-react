import {Text, Box, Flex, VStack } from '@chakra-ui/react'
import GameMoveButtons from './game-move-buttons';
import CancelMoveButton from './cancel-move-button';
import { useBoardContext } from '../board-context';
import { useGameActionContext } from '../../../../contexts/game-action-context';
import { useTurnStateContext } from '../../../../contexts/turn-state-context';


interface Props {
 // isPendingMove: boolean;
  isPendingPass: boolean;
  //isMyTurn: boolean;
  onPlayConfirm: () => void;
  onPassConfirm: () => void;
  onPlayCancel: () => void;
  onPassCancel: () => void;
  onPass: () => void;
  isActiveGame: boolean;
 // turnNumber: number;
  turnStutus: string;
  onResign: () => void;
}


export const GameActionCard = (props: Props) => {
  const { boardState } = useBoardContext();
  const { gameActionState }=useGameActionContext();
  const { turnState, setTurnState}=useTurnStateContext();
  const  isPendingMove=!(gameActionState?.pendingAction == null);
  const isMyTurn =((boardState?.isPlayersTurn)??false);
  const turnNumber=((turnState?.turnNumber)??-1);
  const lastAction=((turnState?.lastAction));
  return (

    <VStack h="100px"  >
      <Box h="10px"></Box>
      <Flex w="100%" h="32px" >
        <Flex flex={1} justifyItems="right" ></Flex>
        <Flex flex={1} justifyContent="center" >
          <GameMoveButtons
            isPendingMove={isPendingMove}
            isMyTurn={isMyTurn}
            onPlayConfirm={props.onPlayConfirm}
            onPassConfirm={props.onPassConfirm}
            onPass={props.onPass}
            isActiveGame={props.isActiveGame}
            isPendingPass={props.isPendingPass} />
        </Flex>
        <Flex flex={1} justifyContent="right" alignContent="center">
          {/* TBD TBD TBD  <Button colorScheme="gray" size="sm" >Resign</Button> */}
        </Flex>
      </Flex>
      <Flex h="32px" w="100%" justifyContent="center"  > <CancelMoveButton
        isPendingMove={isPendingMove}
        isMyTurn={isMyTurn}
        onPlayCancel={props.onPlayCancel}
        onPassCancel={props.onPassCancel}
        isPendingPass={props.isPendingPass}
      ></CancelMoveButton>
      </Flex>
      <Box>
        Turn Number: <Text>{turnNumber}</Text>
      </Box>
      <Box>
        {(lastAction?.actionType==="pass")&&<Text>Last Action Was Pass</Text>}
      </Box>

    </VStack>
  )
}
