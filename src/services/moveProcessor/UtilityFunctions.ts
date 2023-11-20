
import { Turn } from "../../firestore";
//import { TurnDto } from "../repositories/dtos/turnDto";
import { StoneColor } from "./constants";

function getStoneColorOfCurrentTurn(lastTurn: Turn): string {
  return lastTurn.turnPlayerColor[0] == StoneColor.White ? StoneColor.Black : StoneColor.White;
}

function getIsMyTurn(oldTurn: Turn, userId: string): boolean {
  const stoneColorOfCurrentPlayer = getStoneColorOfCurrentPlayer(
    userId,
    oldTurn
  );
  const isMyturn: boolean =
    stoneColorOfCurrentPlayer === oldTurn.turnPlayerColor ? false : true;
  return isMyturn;
}

function getStoneColorOfCurrentPlayer(
  userId: string,
  lastTurn: Turn
): StoneColor {
  if (userId == lastTurn.playerBlackId) {
    return StoneColor.Black;
  }
  return StoneColor.White;
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