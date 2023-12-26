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

const gameStateFactory = {
    createGameState
};

export default gameStateFactory;