import {  addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { PLAYER_COLLECTION } from "../../firestore";

export interface Player {
    id: string;
    name: string;
    location: string;
    bio: string;
    rankInfo: string;
    status: string;
    uid: string;
    createDate: string;
}

export function addPlayerProfile(
    name: string, 
    location:string, 
    rankInfo: string, 
    bio: string, 
    status: string, 
    uid: string,
    createDate: string) {
    return addDoc(collection(db, PLAYER_COLLECTION), { name, location, rankInfo, bio, status, uid,  createDate })
}

/* for future use
    export function setPlayerProfile( name: string, locations:string, rankInfo: string, bio: string, status: string, createDate: string) {
    const docData = {
        name: name,
        location:location,
        rankInfo: rankInfo,
        bio: bio,
        status: status,
        createDate: createDate
    }
    return setDoc(doc(db, PLAYER_COLLECTION, uid), docData);
} */

export async function getPlayersAll() {
    const otherPlayersQueryAll = query(collection(db, PLAYER_COLLECTION), orderBy("name", "asc"));
    const querySnapshot = await getDocs(otherPlayersQueryAll);
    const players: Player[] = [];
    for (const documentSnapshot of querySnapshot.docs) {
        const player: Player = documentSnapshot.data() as Player;
        player.id = documentSnapshot.id;
        await players.push({
            ...(player)
        })
    }
    return players;
}

export async function getPlayer(uid: string): Promise<Player | null> {
    const playersQuery = query(collection(db, PLAYER_COLLECTION), where("uid", "==", uid));
    const querySnapshot = await getDocs(playersQuery);
    if (querySnapshot?.docs.length > 0) {
        const player: Player = querySnapshot.docs[0].data() as Player;
        player.id = querySnapshot.docs[0].id;
        return player;
    }
    else return null;
}

export async function getPlayerByName(name: string): Promise<Player | null> {
    const playersQuery = query(collection(db, PLAYER_COLLECTION), where("name", "==", name));
    const querySnapshot = await getDocs(playersQuery);

    if (querySnapshot?.docs.length > 0) {
        const player: Player = querySnapshot.docs[0].data() as Player;
        player.id = querySnapshot.docs[0].id;
        return player;
    }
    else return null;
}
