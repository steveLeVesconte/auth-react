
import { Player, Turn } from "../../firestore";
import { StoneColor } from "./constants";

function getStoneColorOfCurrentTurn(lastTurn: Turn): string {
  return lastTurn.turnPlayerColor[0] == StoneColor.White ? StoneColor.Black : StoneColor.White;
}

function getIsMyTurn(oldTurn: Turn | null | undefined, player: Player | null): boolean {

  if (!player) {
    return false;
  }

  if (oldTurn) {
    const stoneColorOfCurrentPlayer = getStoneColorOfCurrentPlayer(
      player.id,
      oldTurn
    );
    const isMyturn: boolean =
      stoneColorOfCurrentPlayer === oldTurn.turnPlayerColor ? false : true;
    return isMyturn;
  }
  else {
    return false;
  }
}

function getStoneColorOfCurrentPlayer(
  userId: string,
  lastTurn: Turn
): string {
  if (userId == lastTurn.playerBlackId) {
    return 'b';
  }
  return 'w';
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
  getStoneColorOfCurrentPlayer,
  boardArrayToString,
  stringBoardToArray
}

export default utilities;