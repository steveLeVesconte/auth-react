import { STONE_BLACK, STONE_WHITE } from "../constants";
import { Player } from "./data/player-service";
import { Turn } from "./data/turn-service";

export type stoneColorDependentReturn={
  playerBlackId:string,
  playerBlackName:string,
  playerWhiteId:string,
  playerWhiteName:string
}

const stoneColorDependentValues=(player:Player|null, userStoneColor:string,opponentId:string, opponentName:string ):
stoneColorDependentReturn=>{
    let playerBlackId = player?.id;
    let playerBlackName = player?.name;
    let playerWhiteId = opponentId;
    let playerWhiteName = opponentName;
    if (userStoneColor == STONE_WHITE) {
      playerBlackId = opponentId;
      playerBlackName = opponentName;
      playerWhiteId = player?.id ?? "";
      playerWhiteName = player?.name ?? "";
    }   

    return {playerBlackId:(playerBlackId??""),
    playerBlackName:(playerBlackName??""),
    playerWhiteId,
    playerWhiteName}
}

function getStoneColorOfCurrentTurn(lastTurn: Turn): string {
  return lastTurn.turnPlayerColor[0] == STONE_WHITE ? STONE_BLACK : STONE_WHITE;
}

function getIsMyTurn(oldTurn: Turn | null | undefined, player: Player | null): boolean {
  if (!player) {
    return false;
  }

  if (!(player?.id)) {
    return false;
  }

  if (oldTurn) {
    const stoneColorOfPrevTurn = oldTurn.turnPlayerColor;
    const myColor = getStoneColorOfPlayer(player.id, oldTurn)
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

  lastTurn: Turn | null | undefined
): string {
  if (userId == lastTurn?.playerBlackId) {
    return 'b';
  }
  if (userId == lastTurn?.playerWhiteId) {
    return 'w';
  }

  return '_';
}

function getStoneColorOfOpponent(
  playerUserId: string,
  lastTurn: Turn | null | undefined
): string {
  if (playerUserId == lastTurn?.playerBlackId) {
    return 'w';
  }
  if (playerUserId == lastTurn?.playerWhiteId) {
    return 'b';
  }
  return '_';
}

function getNameOfOpponent(
  playerUserId: string,
  lastTurn: Turn | null | undefined
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
  lastTurn: Turn | null | undefined
): number {
  if (userId == lastTurn?.playerBlackId) {
    return lastTurn.resultState.prisonersOfWhite;
  }
  if (userId == lastTurn?.playerWhiteId) {
    return lastTurn.resultState.prisonersOfBlack;
  }
  return -1;
}

function getPrisonersOfCurrentPlayer(
  userId: string,
  lastTurn: Turn | null | undefined
): number {
  if (userId == lastTurn?.playerBlackId) {
    return lastTurn.resultState.prisonersOfBlack;
  }
  if (userId == lastTurn?.playerWhiteId) {
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
  getNameOfOpponent,
  getPrisonersOfCurrentPlayer,
  getPrisonersOfOpponent,
  boardArrayToString,
  stringBoardToArray,
  stoneColorDependentValues
}

export default utilities;
