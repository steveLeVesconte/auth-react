

import { Turn } from "../data/turn-service";
import gameStateFactory from "./game-state-factory";
import { BaseSubmissionResult, Submission } from "../moveProcessor";
import { Player } from "../data/player-service";
import { STONE_BLACK, STONE_WHITE } from "../../constants";

function createTurn(oldTurn: Turn, evaluation: BaseSubmissionResult, submission: Submission): Turn {

  const dateStamp = new Date().toISOString();

  const newState = gameStateFactory.createGameState(evaluation, oldTurn);
  const newTurn: Turn = {
    ...oldTurn,
    turnNumber: oldTurn.turnNumber + 1,
    turnPlayerColor: submission.stoneColorOfThisTurn,

    koCompareState: oldTurn.initialState,
    initialState: oldTurn.resultState,
    resultState: newState,
    action: {
      actionType: submission.actionType,
      location: { row: submission.stonePlay.row, col: submission.stonePlay.col },
    },
    isValid: evaluation.isValidSubmission,
    isKo: evaluation.isKo,
    comments: "",
    createDate: dateStamp,
    updateDate: dateStamp
  }


  return newTurn;
}

function createPassTurn(oldTurn: Turn): Turn {

  /// create new turn record to save   ////////

  const dateStamp = new Date().toISOString();

  const newTurn: Turn = {
    ...oldTurn,
    turnNumber: oldTurn.turnNumber + 1,
    turnPlayerColor: oldTurn.turnPlayerColor == STONE_BLACK ? STONE_WHITE : STONE_BLACK,

    koCompareState: oldTurn.initialState,
    initialState: oldTurn.resultState,
    resultState: oldTurn.resultState,
    action: {
      actionType: "pass",
      location: { row: -1, col: -1 },///TBD Refactor to null or undefined
    },
    isValid: true,
    isKo: false,
    comments: "",
    createDate: dateStamp,
    updateDate: dateStamp
  }


  return newTurn;
}


function createStartingTurn(creatingPlayer: Player, opponent: Player, creatorStoneColor: string, matchId: string): Turn {
  const creatorChoseBlack: boolean = creatorStoneColor == STONE_BLACK;
  const startState = gameStateFactory.createStartingGameState();
  const dateStamp = new Date().toISOString();

  const newTurn: Turn = {
    id: "",
    playerBlackId: creatorChoseBlack ? creatingPlayer.id : opponent.id,
    playerBlackName: creatorChoseBlack ? creatingPlayer.name : opponent.name,
    playerWhiteId: creatorChoseBlack ? opponent.id : creatingPlayer.id,
    playerWhiteName: creatorChoseBlack ? opponent.name : creatingPlayer.name,
    turnNumber: 0,
    turnPlayerColor: STONE_BLACK,
    matchId: matchId,
    koCompareState: startState,
    initialState: startState,
    resultState: startState,
    action: {
      actionType: "new",
      location: null,
    },
    isValid: true,
    isKo: false,
    comments: "",
    createDate: dateStamp,
    updateDate: dateStamp
  }

  return newTurn;
}

const turnFactory = {
  createTurn,
  createStartingTurn,
  createPassTurn

};

export default turnFactory;