import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    Text
} from '@chakra-ui/react';
import { Match, Message, Player } from '../firestore';
import { db } from '../firebase';
import { useContext, useEffect, useRef, useState } from 'react';
import { addDoc, collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { PlayerContext } from '../contexts/PlayerContext';
import MessageCard from './GoArena/MessageCard';

interface Props {
    match: Match;
}

const Chat = ({ match }: Props) => {
    const player: Player | null = useContext(PlayerContext)

    const [newMessage, setNewMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef, where("matchId", "==", match.id), orderBy("createDate", "asc"), limit(15));
        //const unsubscribe=   TBD
        onSnapshot(queryMessages, (snapshot) => {
            const messagesArray: Message[] = [];
            snapshot.forEach((doc) => {
                const thisMessage = { ...doc.data(), id: doc.id } as Message;
                messagesArray.push(thisMessage)
            });
            setMessages(messagesArray);
        });
        //return ()=>unsubscribe;  TBD
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (newMessage === "") return;
        await addDoc(messagesRef, {
            message: newMessage,
            speakerName: player?.name ?? "unkown",
            matchId: match.id,
            createDate: (new Date).toISOString()
        });
        setNewMessage("");
    }
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
      };
    return (
        <Box >

            <Flex w="100%" h="80%" maxH="500px" overflowY="scroll" flexDirection="column" p="3">
                {messages.map((item) => {
                    if (item.speakerName === "me") {
                        return (
                            <Flex key={item.id} w="100%" justify="flex-end">
                                <Flex
                                    bg="black"
                                    color="white"
                                    minW="100px"
                                    maxW="350px"
                                    my="1"
                                    p="3"
                                >
                                    <Text>{item.message}</Text>
                                </Flex>
                            </Flex>
                        );
                    } else {
                        return (
                            <Flex key={item.id} w="100%">
{/*                                 <Avatar
                                    name="Computer"
                                    src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                                    bg="blue.300"
                                ></Avatar> */}
                                <Flex
                                    bg="gray.100"
                                    color="black"
                                    minW="100px"
                                    maxW="350px"
                                    my="1"
                                    p="3"
                                >
                                    <Text>{item.message}</Text>
                                </Flex>
                            </Flex>
                        );
                    }
                })}
                <AlwaysScrollToBottom />
            </Flex>
            <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                    <Button type="submit">Send</Button>
                </form>





            {/*      <Card>
            <CardHeader>
                <h1>Chat as {player?.name}</h1>
            </CardHeader>
            <CardBody>

                <div>{messages.map((thisMessage) => ( <MessageCard message={thisMessage}></MessageCard>))}</div>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                    <Button type="submit">Send</Button>
                </form>
            </CardBody>
        </Card> */}
        </Box>
    );
};

export default Chat;
