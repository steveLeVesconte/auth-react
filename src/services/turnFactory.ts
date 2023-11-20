import { BaseSubmissionResult, Submission } from "go-game-move-processor";
import { ActionDto, TurnDto } from "../../repositories/dtos/turnDto";
import gameStateFactory from "./gameStateFactory";
import { StoneColor } from "../../constants";
import { GameUserDto } from "../../repositories/dtos/GameUserDto";

function createTurn(oldTurn: TurnDto, evaluation: BaseSubmissionResult, submission: Submission): TurnDto {

  /// create new turn record to save   ////////
  //// evaluation, turn, submission
  const newTurn: TurnDto = new TurnDto();

  const newState = gameStateFactory.createGameState(evaluation, oldTurn);

  const dateStamp = new Date().toISOString();
  newTurn.cratedAt = dateStamp;
  newTurn.updatedAt = dateStamp;
  const gameAction = new ActionDto();
  gameAction.actionType = "play";
  gameAction.location = [submission.stonePlay.row, submission.stonePlay.col];
  newTurn.action = gameAction;
  newTurn.atari = evaluation.isAtari;
  newTurn.initialState = oldTurn.resultState;
  newTurn.isKo = evaluation.isKo;
  newTurn.isValid = true;
  newTurn.koCompareState = oldTurn.initialState;
  newTurn.matchId = oldTurn.matchId;
  newTurn.playerBlackId = oldTurn.playerBlackId;
  newTurn.playerBlackName = oldTurn.playerBlackName;
  newTurn.playerWhiteId = oldTurn.playerWhiteId;
  newTurn.playerWhiteName = oldTurn.playerWhiteName;
  newTurn.resultState = newState;
  newTurn.turnNumber = oldTurn.turnNumber + 1;
  newTurn.turnPlayer = submission.stoneColorOfThisTurn as StoneColor;
  return newTurn;
}

function createStartingTurn(creatingPlayer: GameUserDto, opponent: GameUserDto, creatorStoneColor: StoneColor, matchId: string): TurnDto {
  const newTurn: TurnDto = new TurnDto();

  const startState = gameStateFactory.createStartingGameState();

  const dateStamp = new Date().toISOString();
  newTurn.cratedAt = dateStamp;
  newTurn.updatedAt = dateStamp;
  newTurn.initialState = startState;
  newTurn.resultState = startState;
  newTurn.isValid = true;
  newTurn.koCompareState = startState;
  newTurn.matchId = matchId;

  if (creatorStoneColor === StoneColor.Black) {
    newTurn.playerBlackId = creatingPlayer._id;
    newTurn.playerBlackName = creatingPlayer.name;
    newTurn.playerWhiteId = opponent._id;
    newTurn.playerWhiteName = opponent.name;
  }
  else {
    newTurn.playerWhiteId = creatingPlayer._id;
    newTurn.playerWhiteName = creatingPlayer.name;
    newTurn.playerBlackId = opponent._id;
    newTurn.playerBlackName = opponent.name;
  }
  newTurn.turnNumber = 0;
  newTurn.turnPlayer = StoneColor.White;
  return newTurn;
}

const turnFactory = {
  createTurn,
  createStartingTurn

};

export default turnFactory;