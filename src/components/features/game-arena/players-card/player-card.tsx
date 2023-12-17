import { Text, Card, CardBody, VStack, Image, HStack } from "@chakra-ui/react";
import whiteStoneImage from '../../../../assets/whiteStoneTrans.png'
import blackStoneImage from '../../../../assets/blackStoneTrans.png'
import styles from "./players-card.module.css"


interface Props {
  stoneColor: string;
  prisoners: number;
  playerName: string;
  oppoenentName: string;
  isMyTurn: boolean;
  isPlayer: boolean;
  onPass: () => void;
}

export const PlayerCard = (props: Props) => {
  return (
    <Card h="100%">
      <CardBody p="5px">
        <VStack alignItems="left" gap={0}>
          <HStack alignItems="left">
            {props.stoneColor == "w" && (
              <Image className={styles.playerStone} src={whiteStoneImage} />
            )}
            {props.stoneColor == "b" && (
              <Image className={styles.playerStone}  src={blackStoneImage} />
            )}
          </HStack>
          <Text> {props.playerName}</Text>
          <Text>Caputered: {props.prisoners}</Text>
        </VStack>
      </CardBody>
    </Card>
  );
};
