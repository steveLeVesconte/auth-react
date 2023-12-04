import { Box,  Button,  Flex,  VStack } from '@chakra-ui/react'
//import { useNavigate } from 'react-router-dom';
import  GameMoveButton  from './GameMoveButton';
import CancelMoveButton from './CancelMoveButton';


//import utilities from '../../services/moveProcessor/UtilityFunctions'
interface Props {
  isPendingMove: boolean;
  isPendingPass: boolean;
  isMyTurn: boolean;
  onPlayConfirm: () => void;
  onPassConfirm: () => void;
  onPlayCancel: () => void;
  onPassCancel: () => void;
  onPass: () => void;
  isActiveGame: boolean;
  turnNumber: number;
  turnStutus: string;
  onResign: () => void;

}


export const ActionCard = (props:Props) => {
    //const navigate = useNavigate();
  return (
   
   <VStack h="100px"  p={2}>
    <Box h="10px"></Box>
    <Flex w="100%" h="32px" >
      <Flex flex={1} justifyItems="right" ></Flex>

      <Flex flex={1} justifyContent="center" >
        <GameMoveButton 
            isPendingMove={props.isPendingMove}
            isMyTurn={props.isMyTurn}
            onPlayConfirm={props.onPlayConfirm}
            onPassConfirm={props.onPassConfirm}
            onPass={props.onPass}
            isActiveGame={props.isActiveGame} 
            isPendingPass={props.isPendingPass}    />    
          
    
      </Flex>
      <Flex flex={1} justifyContent="right" alignContent="center">
      <Button colorScheme="gray" size="sm" >Resign</Button>
      </Flex>
    </Flex>
    <Flex h="32px" w="100%" justifyContent="center"  > <CancelMoveButton
              isPendingMove={props.isPendingMove}
              isMyTurn={props.isMyTurn}
              onPlayCancel={props.onPlayCancel}
              onPassCancel={props.onPassCancel}
   
   
              isPendingPass={props.isPendingPass} 
    ></CancelMoveButton>
    {/*   {props.isMyTurn && <Heading size="md" >Your turn to play</Heading>}
      {(!props.isMyTurn) && <Heading size="md">Waiting for opponent to play.</Heading>} */}
    </Flex>
   </VStack>
 


 /*    <Box h="100%" p={2}>
    <Card h="100%">
<CardBody>
    <div>action Card</div>

          <Button onClick={() => { navigate("/") }}>Home</Button>
  */
/* {utilities.getIsMyTurn(turn, player) && <Button onClick={() => handlePass(turn, player?.id ?? "")}>Pass</Button>}
<div> {utilities.getStoneColorOfCurrentPlayer(player?.id ?? "", turn)}</div>
<div>{utilities.getIsMyTurn(turn, player) ? "myturn" : "notMyTurn"}</div>
<div>{(turn?.turnNumber ?? 0) + 1}</div></div>
 */

/*     </CardBody>
    </Card>
    </Box> */
  )
}
