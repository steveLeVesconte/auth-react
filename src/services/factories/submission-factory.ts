

//import {  Turn } from "../firestore";
import { Turn } from "../data/turn-service";
import { StonePlay, Submission } from "../moveProcessor";
import utilities from "../moveProcessor/UtilityFunctions";


function createSubmission(turn: Turn, row:number, col:number): Submission {
  const currentPlayerColor = utilities.getStoneColorOfCurrentTurn( turn);
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