import { useEffect, useState } from "react";
import { Message, addMessage, watchMessagesForMatchId } from "./message-service";

const useMessages = (matchId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const handleNewMessageList = (messages: Message[]) => {
        setMessages(messages.reverse());
    };

    useEffect(() => {
        watchMessagesForMatchId(matchId, handleNewMessageList);
        //return ()=>unsubscribe;  TBD?? not sure.
    }, []);

    const addNewMessage = (message: Message) => {
        addMessage(message);
    }

    return { messages, setMessages, addNewMessage }
}



export default useMessages;