import {
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Match } from '../firestore';
import GameBoard from './GoArena/GameBoard';
import { StatusIndicator } from './StatusIndicator';

interface Props {
  match: Match;
  userId: string;
}

const GameCard = ({ match,userId }: Props) => {
  return (
    <Card className='game-card'>
      <CardBody >
        <div className="game-board-color">
          <GameBoard boardString={match.board ?? ""} isMyTurn={false} onSelectIntersection={() => { }} />
        </div>
        <SimpleGrid
        //columns={{ sm: 1, md: 1, lg: 1, xl: 1 }}
        spacing={1}
        paddingTop="8px"
      >
        <HStack>  
        <Text align="left"> Status: </Text><StatusIndicator userId={userId} match={match} />
        </HStack>  
          <div>
            <Text align="left" >Black: {match.playerBlackName} </Text></div>
        <div>   <Text align="left">White: {match.playerWhiteName} </Text></div>
          <Text align="left">Turn Of: {match.nextTurnPlayer === "b" ? "Black" : "White"} </Text>
          <Text align="left">Move: {match.turnNumber} </Text>
          <Text align="left">Start Date: {match.createDate.substring(0, 10)} </Text>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default GameCard;
