import { Box, Button, Card, CardBody, Flex } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext, PlayerContextType } from "../contexts/PlayerContext";
import MessageCard from "./GoArena/MessageCard";
import { Match } from "../services/match-service";
import {
  Message,
  addMessage,
  watchMessagesForMatchId,
} from "../services/message-service";

interface Props {
  match: Match;
}

const Chat = ({ match }: Props) => {
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    watchMessagesForMatchId(match.id, handleNewMessageList);
    //return ()=>unsubscribe;  TBD?? not sure.
  }, []);

  const handleNewMessageList = (messages: Message[]) => {
    setMessages(messages.reverse());
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("handleSubmit called: ", newMessage);
    e.preventDefault();
    if (newMessage === "") return;
    addMessage({
      message: newMessage,
      speakerName: player?.name ?? "unkown",
      matchId: match.id,
      createDate: new Date().toISOString(),
    } as Message);
    setNewMessage("");
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
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
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
