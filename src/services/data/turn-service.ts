import { addDoc, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { TURN_COLLECTION } from "../../firestore";

export interface Turn {
    id: string;
    matchId: string;
    turnPlayerColor: string;
    turnNumber: number;
    playerBlackId: string;
    playerWhiteId: string;
    playerBlackName: string;
    playerWhiteName: string;
    koCompareState: GameState;
    initialState: GameState;
    resultState: GameState;
    action: GameAction;
    isValid: boolean;
    isKo: boolean;
    comments: string;
    createDate: string;
    updateDate: string;
}

export interface GameState {
    board: string;
    prisonersOfBlack: number;
    prisonersOfWhite: number;
}

export interface GameAction {
    actionType: string;
    location: { row: number, col: number } | null;
}

export function addTurn(turn: Turn) {
    return addDoc(collection(db, TURN_COLLECTION), turn)
}


export function watchForLatestTurnForMatchId(matchId: string, onNewTurn: (latestTrun: Turn) => void): void {

    console.log('watchForLatestTurnForMatchId', matchId);
    const turnQuery =
        query(collection(db, TURN_COLLECTION),
            where("matchId", "==", matchId),
            orderBy("createDate", "desc"),
            limit(1));
    onSnapshot(turnQuery, (querySnapshot) => {
        console.log('onSnapshot: ',querySnapshot);
   
        querySnapshot.forEach((doc) => {

            const latestTurn = { ...doc.data(), id: doc.id } as Turn;
            console.log('onSnapshot: latestTurn ', latestTurn);
            onNewTurn(latestTurn);
        });
    });

}
