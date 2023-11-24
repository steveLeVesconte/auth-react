import {
  Card,
  CardBody,
  HStack,




  Text,

} from '@chakra-ui/react';
import { Match } from '../firestore';

import GoGameBoard from './GoArena/GoGameBoard';

interface Props {
  match: Match;
}

const GameCard = ({ match }: Props) => {
  return (
    <Card>
      <CardBody>
   {/*      <Image src={defaultImage} boxSize='300px' /> */}
        <GoGameBoard boardString={match.board ?? ""} isMyTurn={false} onSelectIntersection={() => { }} />

          <div >
          <div>
            <Text align="left" >Black: {match.playerBlackName} </Text></div>
          <div>  <Text align="left">White: {match.playerWhiteName} </Text></div>
          <Text align="left">Turn Of: {match.nextTurnPlayer==="b"?"Black":"White"} </Text>
           <HStack>
            <Text align="left">Date: {match.createDate.substring(0,10)} </Text>
            <Text align="left">Move: {match.turnNumber} </Text>

           </HStack>

{/*           <div>  <Text>Move: {match.id} </Text></div> */}
</div>

      </CardBody>
    </Card>
  );
};

export default GameCard;
