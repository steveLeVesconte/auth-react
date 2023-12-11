import { Image, useColorModeValue, Text, Box, Flex } from "@chakra-ui/react";
import blackStoneImage from "../../assets/blackStoneTrans.png";
import whiteStoneImage from "../../assets/whiteStoneTrans.png";

import { Message } from "../../firestore";

interface Props {
  message: Message;
  stoneColor: string;
}

const MessageCard = (props: Props) => {
  const nameColor = useColorModeValue("orange.600", "orange.100");
  console.log("message: ", props.message);

  return (
    <Flex minH="20px" mb="15px" flexDirection="row" className="message-card">
      <Box className="message-stone-div" flexShrink={0} width="35px">
        {props.stoneColor == "w" && (
          <Image className="message-stone" src={whiteStoneImage} />
        )}
        {props.stoneColor == "b" && (
          <Image className="message-stone" src={blackStoneImage} />
        )}
      </Box>
      <Box className="message-unit" paddingRight={4}>
        <span className="message-date">
          {props.message.createDate.length > 9 &&
            props.message.createDate.substring(0, 10)}
        </span>
        <span className="message-time">
          {props.message.createDate.length > 10 &&
            " [ " + props.message.createDate.substring(11, 16) + " ] "}
        </span>
        <Text as="span" color={nameColor}>
          {props.message.speakerName}:{" "}
        </Text>
        <span className="message-text">{props.message.message}</span>
      </Box>
    </Flex>
  );
};

export default MessageCard;
