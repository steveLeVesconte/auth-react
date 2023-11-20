

import {  Turn } from "../firestore";
import { StonePlay, Submission } from "./moveProcessor";
import utilities from "./moveProcessor/UtilityFunctions";


function createSubmission(turn: Turn, userId:string, row:number, col:number): Submission {
  const currentPlayerColor = utilities.getStoneColorOfCurrentPlayer(userId, turn);
  const boardArray = utilities.stringBoardToArray(turn.resultState.board);
  const koCompareBoardArray = utilities.stringBoardToArray(turn.initialState.board);
  const submission: Submission = new Submission(
    new StonePlay(row, col),
    koCompareBoardArray,
    boardArray,
    "play",
    currentPlayerColor
  );
  return submission;
}

const submissionFactory = {
  createSubmission
};

export default submissionFactory;