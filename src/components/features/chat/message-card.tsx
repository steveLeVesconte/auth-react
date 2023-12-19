import { Image, useColorModeValue, Text, Box, Flex } from "@chakra-ui/react";
import blackStoneImage from "../../../assets/blackStoneTrans.png";
import whiteStoneImage from "../../../assets/whiteStoneTrans.png";
import { Message } from "../../../services/data/message-service";
import styles from "./chat.module.css";

interface Props {
  message: Message;
  stoneColor: string;
}

const MessageCard = (props: Props) => {
  const nameColor = useColorModeValue("orange.600", "orange.100");
  return (
    <Flex minH="20px" mb="15px" flexDirection="row" className="message-card">
      <Box className={styles.MessageStoneDiv} flexShrink={0} width="35px">
        {props.stoneColor == "w" && (
          <Image className={styles.messageStone} src={whiteStoneImage} />
        )}
        {props.stoneColor == "b" && (
          <Image className={styles.messageStone} src={blackStoneImage} />
        )}
      </Box>
      <Box  paddingRight={4}>
        <span >
          {props.message.createDate.length > 9 &&
            props.message.createDate.substring(0, 10)}
        </span>
        <span >
          {props.message.createDate.length > 10 &&
            " [ " + props.message.createDate.substring(11, 16) + " ] "}
        </span>
        <Text as="span" color={nameColor}>
          {props.message.speakerName}:{" "}
        </Text>
        <span >{props.message.message}</span>
      </Box>
    </Flex>
  );
};

export default MessageCard;
