import {
    Box,
    Button,
    Card,
    CardBody,
   
    Flex
} from '@chakra-ui/react';
import { Match, Message, Player } from '../firestore';
import { db } from '../firebase';
import { useContext, useEffect, useRef, useState } from 'react';
import { addDoc, collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { PlayerContext } from '../contexts/PlayerContext';
import MessageCard from './GoArena/MessageCard';
//import MessageCard from './GoArena/MessageCard';

interface Props {
    match: Match;
}

const Chat = ({ match }: Props) => {
    const player: Player | null = useContext(PlayerContext)

    const [newMessage, setNewMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesRef = collection(db, "messages");

	const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension(){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    useEffect(() => {
        const updateDimension = () => {
              setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

    
        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
  }, [screenSize])



    useEffect(() => {
        const queryMessages = query(messagesRef, where("matchId", "==", match.id), orderBy("createDate", "desc"), limit(25));
        //const unsubscribe=   TBD
        onSnapshot(queryMessages, (snapshot) => {
            const messagesArray: Message[] = [];
            snapshot.forEach((doc) => {
                const thisMessage = { ...doc.data(), id: doc.id } as Message;
                messagesArray.push(thisMessage)
            });
            console.log('set messages next- messageArray: ',messagesArray);
            setMessages(messagesArray.reverse());
        });
        //return ()=>unsubscribe;  TBD
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        console.log('handleSubmit called: ', newMessage);
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
        const elementRef = useRef<HTMLDivElement>(null);
        useEffect(() => elementRef.current?.scrollIntoView());
        return <div ref={elementRef} />;
      };

    function getMessageStoneColor(senderName:string,match:Match):string{
        if(match.playerBlackName===senderName){
            return "b";
        }
        else
        return "w";
      }
    return (
        <Box h="100%" pl={2} pr={2} pt={2}>
    <Card h="100%">
<CardBody height="100%">
        <Flex w="100%" height="100%"  flexDirection="column" p="0px">
            <Box className='chat-window' w="100%"    p="0px">
                <Box overflowY="scroll"  height="100%">
                {messages.map((item) => {
   /*                  if (item.speakerName === "me") { */
                        return (
                           /*  <Flex key={item.id} w="100%" justify="flex-end"> */
                                <MessageCard
                                message={item}
                                stoneColor={getMessageStoneColor(item.speakerName,match)}
                                
                                ></MessageCard>
                                /* <Flex
                                    bg="black"
                                    color="white"
                                    minW="100px"
                                    maxW="350px"
                                    my="1"
                                    p="3"
                                >
                                    <Text>{item.message}</Text>
                                </Flex> */
                      /*       </Flex> */
                        );
      /*               } else {
                        return (
                            <Flex key={item.id} w="100%"> */
{/*                                 <Avatar
                                    name="Computer"
                                    src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                                    bg="blue.300"
                                ></Avatar> */}
                              /*   <Flex
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
                    } */
                })}
           {screenSize.width>1600 && <AlwaysScrollToBottom />}   
            </Box>
            </Box>
            
            <form onSubmit={handleSubmit}>
                <Flex mt="10px" flexDirection="row">
                    <input style={{flex:1}} onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                    <Button type="submit">Send</Button>
                    </Flex>
                </form>
             
                </Flex>
         




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
        </CardBody>
                </Card>

        </Box>
    );
};

export default Chat;
