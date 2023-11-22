import {
    Card,
    CardBody,
    CardHeader,
} from '@chakra-ui/react';
import { Match, Message, Player } from '../firestore';
import { db } from '../firebase';
import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { PlayerContext } from '../contexts/PlayerContext';

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

    return (
        <Card>
            <CardHeader>
                <h1>Chat as {player?.name}</h1>
            </CardHeader>
            <CardBody>
                <div>{messages.map((thisMessage) => (<div key={thisMessage.id}>{thisMessage.createDate} {thisMessage.speakerName} says: {thisMessage.message}</div>))}</div>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                    <button type="submit">Send</button>
                </form>
            </CardBody>
        </Card>
    );
};

export default Chat;
