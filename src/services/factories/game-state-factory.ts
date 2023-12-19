//import { GameState, Turn } from "../firestore";
import { GameState, Turn } from "../data/turn-service";
import { BaseSubmissionResult } from "../moveProcessor";
import utilities from "../moveProcessor/UtilityFunctions";
import { StoneColor } from "../moveProcessor/constants";

function createGameState(evaluation: BaseSubmissionResult, oldTurn: Turn) {

    const board =
        utilities.boardArrayToString(evaluation.newBoard);
    let prisonersOfBlack = oldTurn.resultState.prisonersOfBlack;
    let prisonersOfWhite = oldTurn.resultState.prisonersOfWhite;

    if (evaluation.capturedStones > 0) {
        if (oldTurn.turnPlayerColor == StoneColor.White) {
            prisonersOfBlack += evaluation.capturedStones;
        }
        else {
            prisonersOfWhite += evaluation.capturedStones;
        }
    }

    const newState: GameState = {
        board: board,
        prisonersOfBlack: prisonersOfBlack,
        prisonersOfWhite: prisonersOfWhite
    }
    return newState;
}

function createStartingGameState() {

    const emptyBoard =
        "___________________," +//0
        "___________________," +//1
        "___________________," +//2
        "___________________," +//3
        "___________________," +//4
        "___________________," +//5
        "___________________," +//6
        "___________________," +//7
        "___________________," +//8
        "___________________," +//9
        "___________________," +//10
        "___________________," +//11
        "___________________," +//12
        "___________________," +//13
        "___________________," +//14
        "___________________," +//15
        "___________________," +//16
        "___________________," +//17
        "___________________";//18
    const gameState: GameState = {
        board: emptyBoard,
        prisonersOfBlack: 0,
        prisonersOfWhite: 0
    };
    return gameState;
}

const gameStateFactory = {
    createGameState,
    createStartingGameState
};

export default gameStateFactory;