
import { Player, Turn } from "../firestore";
import gameStateFactory from "./gameStateFactory";
import { BaseSubmissionResult, Submission } from "./moveProcessor";
import utilities from "./moveProcessor/UtilityFunctions";

function createTurn(oldTurn: Turn, evaluation: BaseSubmissionResult, submission: Submission): Turn {

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
    isValid:evaluation.isValidSubmission,
    isKo:evaluation.isKo,
    comments:"",
    createDate:dateStamp,
    updateDate:dateStamp
  }


  return newTurn;
}

function createPassTurn(oldTurn: Turn,userId): Turn {

  /// create new turn record to save   ////////
  //// evaluation, turn, submission
  //const newTurn: Turn = new Turn();
  const dateStamp = new Date().toISOString();
  
  //const newState = gameStateFactory.createGameState(evaluation, oldTurn);
  const newTurn:Turn={...oldTurn,
    turnNumber: oldTurn.turnNumber+1,
    turnPlayerColor: utilities.getStoneColorOfCurrentPlayer(userId, oldTurn),
   
    koCompareState:oldTurn.initialState,
    initialState:oldTurn.resultState,
    resultState:oldTurn.resultState,
    action: {
      actionType:"pass",
    location:{row:-1,col:-1},///TBD Refactor to null or undefined
    },
    isValid:true,
    isKo:false,
    comments:"",
    createDate:dateStamp,
    updateDate:dateStamp
  }


  return newTurn;
}


function createStartingTurn(creatingPlayer: Player, opponent: Player, creatorStoneColor: string, matchId: string): Turn {
  //const newTurn: TurnDto = new TurnDto();

  const creatorChoseBlack:boolean=creatorStoneColor=="b";
  const startState = gameStateFactory.createStartingGameState();

  const dateStamp = new Date().toISOString();

  const newTurn:Turn={
    id:"",
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

  return newTurn;
}

const turnFactory = {
  createTurn,
  createStartingTurn,
  createPassTurn

};

export default turnFactory;