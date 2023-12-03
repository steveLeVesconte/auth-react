import {
  Card,
  CardBody,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Match } from '../firestore';
import GameBoard from './GoArena/GameBoard';

interface Props {
  match: Match;
}

const GameCard = ({ match }: Props) => {
  return (
    <Card>
      <CardBody p={1}>
        <div className="gameBoardColor">
          <GameBoard boardString={match.board ?? ""} isMyTurn={false} onSelectIntersection={() => { }} />
        </div>
        <div >
          <div>
            <Text align="left" >Black: {match.playerBlackName} </Text></div>
          <div>  <Text align="left">White: {match.playerWhiteName} </Text></div>
          <Text align="left">Turn Of: {match.nextTurnPlayer === "b" ? "Black" : "White"} </Text>
          <HStack>
            <Text align="left">Date: {match.createDate.substring(0, 10)} </Text>
            <Text align="left">Move: {match.turnNumber} </Text>
          </HStack>
        </div>

      </CardBody>
    </Card>
  );
};

export default GameCard;
