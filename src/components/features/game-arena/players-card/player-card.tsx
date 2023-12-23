import {
  Text,
  Card,
  CardBody,
  VStack,
  Image,
  HStack,
  Box,
} from "@chakra-ui/react";
import whiteStoneImage from "../../../../assets/whiteStoneTrans.png";
import blackStoneImage from "../../../../assets/blackStoneTrans.png";
import styles from "./players-card.module.css";
import { STONE_BLACK, STONE_WHITE } from "../../../../constants";

interface Props {
  stoneColor: string;
  prisoners: number;
  playerName: string;
  isMyTurn: boolean;
  isPlayer: boolean;
}

export const PlayerCard = (props: Props) => {
  return (
    <Box id="text" className={styles.playerBox}>
      <Card h="100%">
        <CardBody p="5px">
          <VStack alignItems="left" gap={0}>
            <HStack alignItems="left">
              {props.stoneColor == STONE_WHITE.toString() && (
                <Image className={styles.playerStone} src={whiteStoneImage} />
              )}
              {props.stoneColor == STONE_BLACK.toString() && (
                <Image className={styles.playerStone} src={blackStoneImage} />
              )}
            </HStack>
            <Text> {props.playerName}</Text>
            <Text>Caputered: {props.prisoners}</Text>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};
