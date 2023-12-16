import { addDoc, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

export interface Message {
  id: string;
  message: string;
  matchId: string;
  speakerName: string;
  createDate: string;
}

export function watchMessagesForMatchId(matchId: string, onNewMessage: (messages: Message[]) => void): void {
  const messagesRef = collection(db, "messages");
  const queryMessages = query(
    messagesRef,
    where("matchId", "==", matchId),
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
    onNewMessage(messagesArray);
  });

}

export function addMessage(newMessage: Message) {
  const messagesRef = collection(db, "messages");
  return addDoc(messagesRef, newMessage);
}