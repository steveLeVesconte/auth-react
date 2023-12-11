import { Box, Button, Card, CardBody, Flex } from "@chakra-ui/react";
import { Match, Message } from "../firestore";
import { db } from "../firebase";
import { useContext, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { PlayerContext, PlayerContextType } from "../contexts/PlayerContext";
import MessageCard from "./GoArena/MessageCard";

interface Props {
  match: Match;
}

const Chat = ({ match }: Props) => {
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = collection(db, "messages");
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
    const queryMessages = query(
      messagesRef,
      where("matchId", "==", match.id),
      orderBy("createDate", "desc"),
      limit(10)
    );
    //const unsubscribe=   TBD
    onSnapshot(queryMessages, (snapshot) => {
      const messagesArray: Message[] = [];
      snapshot.forEach((doc) => {
        const thisMessage = { ...doc.data(), id: doc.id } as Message;
        messagesArray.push(thisMessage);
      });
      console.log("set messages next- messageArray: ", messagesArray);
      setMessages(messagesArray.reverse());
    });
    //return ()=>unsubscribe;  TBD
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("handleSubmit called: ", newMessage);
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      message: newMessage,
      speakerName: player?.name ?? "unkown",
      matchId: match.id,
      createDate: new Date().toISOString(),
    });
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
    <Card h="100%">
      <CardBody height="100%" pb={2} className="chat-card-body">
        <Box className="chat-window" p="0px">
          <Box overflowY="scroll" className="chat-scroll">
            {messages.map((item) => {
              return (
                <MessageCard
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
