// import { BaseSubmissionResult, Submission } from "go-game-move-processor";
// import { ActionDto, TurnDto } from "../../repositories/dtos/turnDto";
// import gameStateFactory from "./gameStateFactory";
// import { StoneColor } from "../../constants";
// import { GameUserDto } from "../../repositories/dtos/GameUserDto";

import { Player, Turn } from "../firestore";
import gameStateFactory from "./gameStateFactory";
import { BaseSubmissionResult, Submission } from "./moveProcessor";

function createTurn(oldTurn: Turn, evaluation: BaseSubmissionResult, submission: Submission): Turn {

  /// create new turn record to save   ////////
  //// evaluation, turn, submission
  //const newTurn: Turn = new Turn();
  const dateStamp = new Date().toISOString();
  
  const newState = gameStateFactory.createGameState(evaluation, oldTurn);
  const newTurn:Turn={...oldTurn,
    turnNumber: oldTurn.turnNumber+1,
    turnPlayerColor: submission.stoneColorOfThisTurn,
   
    koCompareState:oldTurn.initialState,
    initialState:oldTurn.resultState,
    resultState:newState,
    action: {
      actionType:submission.actionType,
    location:{row:submission.stonePlay.row,col:submission.stonePlay.col},
    },
    isValid:!evaluation.isValidSubmission,
    isKo:evaluation.isKo,
    comments:"",
    createDate:dateStamp,
    updateDate:dateStamp
  }


  // const dateStamp = new Date().toISOString();
  // newTurn.cratedAt = dateStamp;
  // newTurn.updatedAt = dateStamp;
  // const gameAction = new ActionDto();
  // gameAction.actionType = "play";
  // gameAction.location = [submission.stonePlay.row, submission.stonePlay.col];
  // newTurn.action = gameAction;
  // newTurn.atari = evaluation.isAtari;
  // newTurn.initialState = oldTurn.resultState;
  // newTurn.isKo = evaluation.isKo;
  // newTurn.isValid = true;
  // newTurn.koCompareState = oldTurn.initialState;
  // newTurn.matchId = oldTurn.matchId;
  // newTurn.playerBlackId = oldTurn.playerBlackId;
  // newTurn.playerBlackName = oldTurn.playerBlackName;
  // newTurn.playerWhiteId = oldTurn.playerWhiteId;
  // newTurn.playerWhiteName = oldTurn.playerWhiteName;
  // newTurn.resultState = newState;
  // newTurn.turnNumber = oldTurn.turnNumber + 1;
  // newTurn.turnPlayer = submission.stoneColorOfThisTurn as StoneColor;
  return newTurn;
}

function createStartingTurn(creatingPlayer: Player, opponent: Player, creatorStoneColor: string, matchId: string): Turn {
  //const newTurn: TurnDto = new TurnDto();

  const creatorChoseBlack:boolean=creatorStoneColor=="b";
  const startState = gameStateFactory.createStartingGameState();

  const dateStamp = new Date().toISOString();

  const newTurn:Turn={
    playerBlackId:creatorChoseBlack?creatingPlayer.id:opponent.id ,
    playerBlackName:creatorChoseBlack?creatingPlayer.name:opponent.name ,
    playerWhiteId:creatorChoseBlack?opponent.id:creatingPlayer.id ,
    playerWhiteName:creatorChoseBlack?opponent.name:creatingPlayer.name ,
    turnNumber: 0,
    turnPlayerColor: "b",
    matchId:matchId,
    koCompareState:startState,
    initialState:startState,
    resultState:startState,
    action: {
      actionType:"new",
    location:null,
    },
    isValid:true,
    isKo:false,
    comments:"",
    createDate:dateStamp,
    updateDate:dateStamp
  }
  // newTurn.cratedAt = dateStamp;
  // newTurn.updatedAt = dateStamp;
  // newTurn.initialState = startState;
  // newTurn.resultState = startState;
  // newTurn.isValid = true;
  // newTurn.koCompareState = startState;
  // newTurn.matchId = matchId;

  // if (creatorStoneColor === StoneColor.Black) {
  //   newTurn.playerBlackId = creatingPlayer._id;
  //   newTurn.playerBlackName = creatingPlayer.name;
  //   newTurn.playerWhiteId = opponent._id;
  //   newTurn.playerWhiteName = opponent.name;
  // }
  // else {
  //   newTurn.playerWhiteId = creatingPlayer._id;
  //   newTurn.playerWhiteName = creatingPlayer.name;
  //   newTurn.playerBlackId = opponent._id;
  //   newTurn.playerBlackName = opponent.name;
  // }
  // newTurn.turnNumber = 0;
  // newTurn.turnPlayer = StoneColor.White;
  return newTurn;
}

const turnFactory = {
  createTurn,
  createStartingTurn

};

export default turnFactory;