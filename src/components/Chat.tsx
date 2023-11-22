import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    Image,
    Text
  } from '@chakra-ui/react';
  //import { Link } from 'react-router-dom';
  import { Match, Message, Player } from '../firestore';
import { db } from '../firebase';
import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import {PlayerContext} from '../contexts/PlayerContext';

  //import getCroppedImageUrl from '../services/image-url';
  //import CriticScore from './CriticScore';
  //import Emoji from './Emoji';
  //mport PlatformIconList from './PlatformIconList';
  
  interface Props {
    match: Match;
  }



  
  const Chat = ({ match }: Props) => {
    const player:Player|null = useContext(PlayerContext)

    const [newMessage,setNewMessage]=useState<string>("");
    const [messages,setMessages]=useState<Message[]>([]);
const messagesRef=collection(db,"messages");

useEffect(()=>{
    const queryMessages=query(messagesRef, where("matchId", "==", match.id) , orderBy("createDate", "asc"), limit(15));
    //const unsubscribe=
    onSnapshot(queryMessages, (snapshot)=>{
        const messagesArray:Message[]=[];
        snapshot.forEach((doc) => {
            const thisMessage = { ...doc.data(), id: doc.id } as Message;
  
            messagesArray.push(thisMessage)
          //  messagesArray.push({...doc.data(), id:doc.id})
        });
        setMessages(messagesArray);
    });
    //return ()=>unsubscribe;
},[]);

const handleSubmit=async(e: { preventDefault: () => void; })=>{
    e.preventDefault();

    if(newMessage==="")return;

    await addDoc(messagesRef,{
        message:newMessage,
        speakerName:player?.name??"unkown",
        matchId:match.id,
        createDate:(new Date).toISOString()


    });
    setNewMessage("");
}

    return (
      <Card>
        <CardHeader>
            <h1>Chat as {player?.name}</h1>
        </CardHeader>
      <CardBody>
        <div>{messages.map((thisMessage)=> (<div key={thisMessage.id}>{thisMessage.createDate} {thisMessage.speakerName} says: {thisMessage.message}</div>))}</div>
        <form onSubmit={handleSubmit}>
            <input onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}></input>
            <button type="submit">Send</button>
        </form>

        </CardBody>
      </Card>
    );
  };
  
  export default Chat;
  