import {addDoc, and, collection, doc, getDocs, getFirestore, limit, or, orderBy, query, setDoc, updateDoc, where} from 'firebase/firestore';
import {db} from './firebase';

const PLAYER_COLLECTION='go-players';
export const MATCH_COLLECTION='go-matches';
export const TURN_COLLECTION="go-turn";



export interface Player{
    id: string;
    name: string;
    location: string;
    bio: string;
    status: string;
    uid: string;
    createDate: string;
}
export interface Message{
    id: string;
    message: string;
    matchId: string;
    speakerName: string;
    createDate: string;
}

export interface Match{
    id: string;
    board:string;
    nextTurnPlayer: string;
    playerBlackId:string; 
    playerWhiteId:string; 
    playerBlackName:string; 
    playerWhiteName:string;
    turnNumber:number;
    status:string; 
    createDate:string;
    updateDate:string;

}

export interface Turn{
    id:string;
    matchId:string;
    turnPlayerColor:string;
    turnNumber:number;
    playerBlackId:string;
    playerWhiteId:string;
    playerBlackName:string;
    playerWhiteName:string;
    koCompareState:GameState;
    initialState: GameState;
    resultState: GameState;
    action:GameAction;
    
    isValid: boolean;
    isKo:boolean;
    comments: string;
    createDate: string;
    updateDate: string;
}

export interface GameState{
    board:string;
    prisonersOfBlack: number;
    prisonersOfWhite: number;
}

export interface GameAction{
    actionType:string;
    location:{row:number,col:number}|null;
}

export function addPlayerProfile(uid:string, name:string, rankInfo:string, bio:string, status:string, createDate:string   ){
   return addDoc(collection(db, PLAYER_COLLECTION), {uid, name, rankInfo, bio, status, createDate })
}

export function setPlayerProfile(uid:string, name:string, rankInfo:string, bio:string, status:string, createDate:string   ){
     const docData = {
        name:name,
        rankInfo:rankInfo,
        bio:bio,
        status:status,
        createDate:createDate
     }
     return setDoc(doc(db,PLAYER_COLLECTION,uid),docData);
   
    //return addDoc(collection(db, PLAYER_COLLECTION), {uid, name, rankInfo, bio, status, createDate })
 }

export async function getPlayersAll(){
    const otherPlayersQueryAll=query(collection(db,PLAYER_COLLECTION),  orderBy("name","asc"));
    const querySnapshot= await getDocs(otherPlayersQueryAll);

    const players: Player[] = [];

    for(const documentSnapshot of querySnapshot.docs){
            const player:Player = documentSnapshot.data() as Player;
            player.id=documentSnapshot.id;
            console.log('player#######', player);
            await players.push({
                ...(player)
            })

    }
    return players;
}

export async function getPlayer(uid:string):Promise<Player|null>{
    const playersQuery=query(collection(db,PLAYER_COLLECTION), where("uid","==",uid) );
    const querySnapshot= await getDocs(playersQuery);

   console.log('querySnapshot',querySnapshot);
  // const player:Player=null as Player;
    if(querySnapshot?.docs.length>0)
    {

        const player:Player = querySnapshot.docs[0].data() as Player;
        player.id=querySnapshot.docs[0].id;
        //const player:Player = documentSnapshot.data() as Player;
        return player;
   }
   else return null;

    // const players: Player[] = [];

    // for(const documentSnapshot of querySnapshot.docs){
    //         const player:Player = documentSnapshot.data() as Player;
    //         console.log('player', player);
    //         await players.push({
    //             ...(player)
    //         })

    // }
    // return players;
}



export async function getLatestTurnForMatchId(matchId:string):Promise<Turn|null>{
    console.log('turn querySnapshot matchId',matchId);
    const turnQuery=query(collection(db,TURN_COLLECTION), where("matchId","==",matchId) , orderBy("createDate", "desc"),limit(1) );
    const querySnapshot= await getDocs(turnQuery);

   console.log('turn querySnapshot',querySnapshot);
    if(querySnapshot?.docs.length>0)
    {
        const turn:Turn = querySnapshot.docs[0].data() as Turn;
        return turn;
   }
   else return null;
}

// export async function getLatestTurnForMatchId(matchId:string):Promise<Turn|null>{
//     console.log('turn querySnapshot matchId',matchId);
//     const turnQuery=query(collection(db,TURN_COLLECTION), where("matchId","==",matchId) , orderBy("createDate", "desc"),limit(1) );
//     const querySnapshot= await getDocs(turnQuery);

//    console.log('turn querySnapshot',querySnapshot);
//     if(querySnapshot?.docs.length>0)
//     {
//         const turn:Turn = querySnapshot.docs[0].data() as Turn;
//         return turn;
//    }
//    else return null;
// }

export async function getActiveMatchesForPlayerId(playerId:string):Promise<Match[]|null>{
    console.log('getActiveMatchesForPlayerId - playerId in:', playerId);
    //const matchQuery=query(collection(db,MATCH_COLLECTION), and( where("status","==","active") ,or( where("playerBlackId","==",playerId),where("playerWhitId","==",playerId))) , orderBy("dateCreated", "desc") );
    const matchQuery=query(collection(db,MATCH_COLLECTION), and( where("status","==","active") ,or( where("playerBlackId","==",playerId),where("playerWhiteId","==",playerId))) , orderBy("createDate", "desc") );
    //const matchQuery=query(collection(db,MATCH_COLLECTION),where("playerBlackId","==",playerId)  );
    const querySnapshot= await getDocs(matchQuery);

   console.log('match list querySnapshot',querySnapshot);
  // const player:Player=null as Player;


  const matches: Match[] = [];

  for(const documentSnapshot of querySnapshot.docs){
          const match:Match = documentSnapshot.data() as Match;
          match.id=documentSnapshot.id;
          console.log('match in for each#######', match);
          await matches.push({
              ...(match)
          })

  }
  return matches;
}


  export function setMatchTurnNumber(match:Match, turnNumber:number ){
    console.log('in setMatchTurnNumber   -------- ', match, turnNumber);
    const docData = {...match,turnNumber:turnNumber,updateDate:(new Date).toISOString()
    }
    const docRef = doc(db, MATCH_COLLECTION, match.id);
    updateDoc(docRef, docData)
     .then(docRef => { 
        console.log("Value of an Existing Document Field has been updated", docRef); 
    }) .catch(error => { console.log(error); })

}

export function updateMatch(match:Match, turn:Turn ){
    console.log('in setMatchTurnNumber   -------- ', match, turn);
    const docData = {...match,
        turnPlayerColor:turn.turnPlayerColor,
        turnNumber:turn.turnNumber,
        board:turn.resultState.board, 
        prisonersOfBlack: turn.resultState.prisonersOfBlack,
        prisonersOfWhite: turn.resultState.prisonersOfWhite,
        updateDate:(new Date).toISOString()
    }
    const docRef = doc(db, MATCH_COLLECTION, match.id);
    updateDoc(docRef, docData)
     .then(docRef => { 
        console.log("Value of an Existing Document Field has been updated", docRef); 
    }) .catch(error => { console.log(error); })

}



export function addMatch(
    nextTurnPlayer: string, 
    playerBlackId:string, 
    playerWhiteId:string, 
    playerBlackName:string, 
    playerWhiteName:string,
    turnNumber:number,
    status:string, 
    createDate:string
  ){

    const updateDate=createDate;
    return addDoc(collection(db, MATCH_COLLECTION), {
        nextTurnPlayer, 
        playerBlackId, 
        playerWhiteId, 
        playerBlackName, 
        playerWhiteName,
        turnNumber,
        status,
        createDate,
        updateDate
         })
 }


 
export function addTurn(turn:Turn ){


    return addDoc(collection(db, TURN_COLLECTION), turn)
 }
