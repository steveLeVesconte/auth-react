import {
  Card,
  CardBody,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { Match } from '../firestore';
import defaultImage from '../assets/igo.jpg';
import GoGameBoard from './GoArena/GoGameBoard';

interface Props {
  match: Match;
}

const GameCard = ({ match }: Props) => {
  return (
    <Card>
      <CardBody>
        <Image src={defaultImage} boxSize='300px' />
        <GoGameBoard boardString={match.board ?? ""} isMyTurn={false} onSelectIntersection={() => { }} />
        <Heading fontSize="2xl">
          <div>
            <Text>Black: {match.playerBlackName} </Text></div>
          <div>  <Text>White: {match.playerWhiteName} </Text></div>
          <div>  <Text>Date: {match.createDate} </Text></div>
          <div>  <Text>Move: {match.turnNumber} </Text></div>
          <div>  <Text>Move: {match.id} </Text></div>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
