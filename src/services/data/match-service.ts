import { addDoc, and, collection, doc, getDocs, or, orderBy, query, updateDoc, where } from "firebase/firestore";
import { MATCH_COLLECTION } from "../../firestore";
import { Turn } from "./turn-service";
import { db } from "../../firebase";
import { STONE_BLACK, STONE_WHITE } from "../../constants";

export interface Match {
    id: string;
    board: string;
    nextTurnPlayer: string;
    playerBlackId: string;
    playerWhiteId: string;
    playerBlackName: string;
    playerWhiteName: string;
    turnNumber: number;
    status: string;
    createDate: string;
    updateDate: string;
}

export async function getActiveMatchesForPlayerId(playerId: string): Promise<Match[] | null> {
     const matches: Match[] = [];
    if(! playerId) {
        return matches;
    }
    const matchQuery = query(collection(db, MATCH_COLLECTION), and(where("status", "==", "active"), or(where("playerBlackId", "==", playerId), where("playerWhiteId", "==", playerId))), orderBy("createDate", "desc"));
    const querySnapshot = await getDocs(matchQuery);
    for (const documentSnapshot of querySnapshot.docs) {
        const match: Match = documentSnapshot.data() as Match;
        match.id = documentSnapshot.id;
        await matches.push({
            ...(match)
        })
    }
    return matches;
}

export function setMatchTurnNumber(match: Match, turnNumber: number) {
    const docData = {
        ...match, turnNumber: turnNumber, updateDate: (new Date).toISOString()
    }
    const docRef = doc(db, MATCH_COLLECTION, match.id);
    updateDoc(docRef, docData)
        .then(docRef => {
            console.log("Value of an Existing Document Field has been updated", docRef);
        }).catch(error => { console.log(error); })
}

export function updateMatch(match: Match, turn: Turn) {
    const docData = {
        ...match,
        nextTurnPlayer: turn.turnPlayerColor === STONE_BLACK ? STONE_WHITE : STONE_BLACK,
        turnNumber: turn.turnNumber,
        board: turn.resultState.board,
        prisonersOfBlack: turn.resultState.prisonersOfBlack,
        prisonersOfWhite: turn.resultState.prisonersOfWhite,
        updateDate: (new Date).toISOString()
    }
    const docRef = doc(db, MATCH_COLLECTION, match.id);
    updateDoc(docRef, docData)
        .then(docRef => {
            console.log("Value of an Existing Document Field has been updated", docRef);
        }).catch(error => { console.log(error); })
}

export function addMatch(match: Match) {
    return addDoc(collection(db, MATCH_COLLECTION), match
    )
}
