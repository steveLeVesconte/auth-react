import { Box, Button, Card, CardBody, Flex } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext, PlayerContextType } from "../contexts/PlayerContext";
import MessageCard from "./GoArena/MessageCard";
import { Match } from "../services/match-service";
import { Message} from "../services/message-service";
import useMessages from "../services/useMessages";

interface Props {
  match: Match;
}

const Chat = ({ match }: Props) => {
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const [newMessageText, setNewMessageText] = useState<string>("");
  const {messages, addNewMessage} = useMessages(match.id);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("handleSubmit called: ", newMessageText);
    e.preventDefault();
    if (newMessageText === "") return;
    addNewMessage({
      message: newMessageText,
      speakerName: player?.name ?? "unkown",
      matchId: match.id,
      createDate: new Date().toISOString(),
    } as Message);
    setNewMessageText("");
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  function getMessageStoneColor(senderName: string, match: Match): string {
    if (match.playerBlackName === senderName) {
      return "b";
    } else return "w";
  }
  return (
    <Card h="100%" p={0}>
      <CardBody height="100%" pb={2} className="chat-card-body">
        <Box className="chat-window" p="0px">
          <Box overflowY="scroll" className="chat-scroll">
            {messages.map((item) => {
              return (
                <MessageCard
                  key={item.id}
                  message={item}
                  stoneColor={getMessageStoneColor(item.speakerName, match)}
                ></MessageCard>
              );
            })}
            {false && <AlwaysScrollToBottom />}
          </Box>
          <form onSubmit={handleSubmit}>
            <Flex mt="10px" flexDirection="row">
              <input
                style={{ flex: 1 }}
                onChange={(e) => setNewMessageText(e.target.value)}
                value={newMessageText}
              ></input>
              <Button type="submit">Send</Button>
            </Flex>
          </form>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Chat;
