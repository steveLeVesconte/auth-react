import { Card, CardBody, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { Match } from "../../../services/data/match-service";
import GameBoard from "../game-board/game-board";
import { GameStatusIndicator } from "./game-status-indicator";
import { STONE_BLACK } from "../../../constants";

interface Props {
  match: Match;
  userId: string;
}

const GameCard = ({ match, userId }: Props) => {
  return (
    <Card className="game-card">
      <CardBody>
        <div className="game-board-color">
          <GameBoard
            boardString={match.board ?? ""}
          />
        </div>
        <SimpleGrid spacing={1} paddingTop="8px">
          <HStack>
            <Text align="left"> Status: </Text>
            <GameStatusIndicator userId={userId} match={match} />
          </HStack>
          <div>
            <Text align="left">Black: {match.playerBlackName} </Text>
          </div>
          <div>
            {" "}
            <Text align="left">White: {match.playerWhiteName} </Text>
          </div>
          <Text align="left">
            Turn Of: {match.nextTurnPlayer === STONE_BLACK ? "Black" : "White"}{" "}
          </Text>
          <Text align="left">Move: {match.turnNumber} </Text>
          <Text align="left">
            Start Date: {match.createDate.substring(0, 10)}{" "}
          </Text>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default GameCard;
