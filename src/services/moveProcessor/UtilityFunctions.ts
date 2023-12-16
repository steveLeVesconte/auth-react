

import { Player } from "../player-service";
import { Turn } from "../turn-service";
import { StoneColor } from "./constants";

function getStoneColorOfCurrentTurn(lastTurn: Turn): string {
  return lastTurn.turnPlayerColor[0] == StoneColor.White ? StoneColor.Black : StoneColor.White;
}

function getIsMyTurn(oldTurn: Turn | null | undefined, player: Player | null): boolean {

  if (!player) {
    return false;
  }

  if (oldTurn) {
    const stoneColorOfPrevTurn =oldTurn.turnPlayerColor;
    const myColor=getStoneColorOfPlayer(player.id,oldTurn)
    const isMyturn: boolean =
    stoneColorOfPrevTurn === myColor ? false : true;
    return isMyturn;
  }
  else {
    return false;
  }
}



function getStoneColorOfPlayer(
   userId: string, 
   
  lastTurn: Turn|null|undefined
): string {
  if (userId==lastTurn?.playerBlackId) {
    return 'b';
  }
  if (userId==lastTurn?.playerWhiteId) {
    return 'w';
  }

  return '_';
}


// function getStoneColorOfPrevTurnPlayer(
//   userId: string,
//   lastTurn: Turn|null|undefined
// ): string {
//   if (userId == lastTurn?.playerBlackId) {
//     return 'b';
//   }
//     if (userId == lastTurn?.playerWhiteId) {
//     return 'w';
//   }
//   return '_';
// }

function getStoneColorOfOpponent(
  playerUserId: string,
  lastTurn: Turn|null|undefined
): string {
  if (playerUserId == lastTurn?.playerBlackId) {
    return 'w';
  }
    if (playerUserId == lastTurn?.playerWhiteId) {
    return 'b';
  }
  return '_';
}

function getIdOfOpponent(
  playerUserId: string,
  lastTurn: Turn|null|undefined
): string {
  if (playerUserId == lastTurn?.playerBlackId) {
    return lastTurn.playerWhiteId;
  }
    if (playerUserId == lastTurn?.playerWhiteId) {
    return lastTurn.playerBlackId;
  }
  return '_';
}

function getNameOfOpponent(
  playerUserId: string,
  lastTurn: Turn|null|undefined
): string {
  if (playerUserId == lastTurn?.playerBlackId) {
    return lastTurn.playerWhiteName;
  }
    if (playerUserId == lastTurn?.playerWhiteId) {
    return lastTurn.playerBlackName;
  }
  return 'unknown';
}

function getPrisonersOfOpponent(
  userId: string,
  lastTurn: Turn|null|undefined
): number {
  console.log('getPrisonersOfOpponent turn and id:',userId,lastTurn)
  if (userId == lastTurn?.playerBlackId) {
     console.log('getPrisonersOfOpponent =blackid so returnign white returning:',lastTurn.resultState.prisonersOfWhite)
    return lastTurn.resultState.prisonersOfWhite;
  }
    if (userId == lastTurn?.playerWhiteId) {
      console.log('getPrisonersOfOpponent =whiteId so returning black returning:',lastTurn.resultState.prisonersOfWhite)
   
    return lastTurn.resultState.prisonersOfBlack;
  }
  return -1;
}

function getPrisonersOfCurrentPlayer(
  userId: string,
  lastTurn: Turn|null|undefined
): number {
   console.log('getPrisonersOfCurrentPlayer turn and id:',userId,lastTurn)

  if (userId == lastTurn?.playerBlackId) {
    console.log('getPrisonersOfCurrentPlayer =blackid so returnign black returning:',lastTurn.resultState.prisonersOfBlack)
 
    return lastTurn.resultState.prisonersOfBlack;
  }
    if (userId == lastTurn?.playerWhiteId) {
      console.log('getPrisonersOfCurrentPlayer =whiteid so returnign white returning:',lastTurn.resultState.prisonersOfWhite)
 
    return lastTurn.resultState.prisonersOfWhite;
  }
  return -1;
}
function boardArrayToString(boardArray: string[][]): string {
  let result = "";
  for (let i = 0; i < 19; i++) {
    let rowstring = "";
    const row = boardArray[i];
    for (let j = 0; j < 19; j++) {
      rowstring += row[j];
    }
    if (i < 18) rowstring += ",";
    result += rowstring;
  }
  return result;
}

function stringBoardToArray(boardString: string): string[][] {
  const rows: string[] = boardString.split(' ').join('').split(',');
  const board: string[][] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cols = Array.from(row);
    const outputCol: string[] = [];
    for (let j = 0; j < row.length; j++) {
      outputCol.push(cols[j]);
    }
    board.push(outputCol);
  }
  return board;
}

const utilities = {
  getIsMyTurn,
  getStoneColorOfCurrentTurn,
  getStoneColorOfPlayer,
  getStoneColorOfOpponent,
  getIdOfOpponent,
  getNameOfOpponent,
  getPrisonersOfCurrentPlayer,
  getPrisonersOfOpponent,
  boardArrayToString,
  stringBoardToArray
}

export default utilities;