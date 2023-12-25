import { BellIcon, CloseIcon, Icon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";
import { Match } from "../../../services/data/match-service";
import {
  MATCH_STATUS_ACTIVE,
  STONE_BLACK,
  STONE_WHITE,
} from "../../../constants";

interface Props {
  userId: string;
  match: Match;
}

export const GameStatusIndicator = (props: Props) => {
  if (props.match.status !== MATCH_STATUS_ACTIVE) {
    return (
      <HStack>
        <Icon as={CloseIcon} w={6} h={6} color="orange.500" />{" "}
        <Text>{props.match.status}</Text>
      </HStack>
    );
  }

  if (getIsMyTurnByMatch(props.userId, props.match)) {
    return (
      <HStack>
        <Text>Your turn to play!</Text>
        <Icon as={BellIcon} w={6} h={6} color="orange.500" />
      </HStack>
    );
  } else {
    return (
      <HStack>
        <Text>Waiting for opponent</Text>
      </HStack>
    );
  }

  function getIsMyTurnByMatch(userId: string, match: Match): boolean {
    let userStoneColor = STONE_BLACK;
    if (match.playerWhiteId == userId) {
      userStoneColor = STONE_WHITE;
    }
    const isMyTurn = userStoneColor === match.nextTurnPlayer;
    return isMyTurn;
  }
};
