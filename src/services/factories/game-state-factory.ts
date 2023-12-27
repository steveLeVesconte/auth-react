import { BaseSubmissionResult } from "@two-way-press/go-game-move-processor";
import { GameState, Turn } from "../data/turn-service";
import utilities from "../utilitities";
import { STONE_WHITE } from "../../constants";

function createGameState(evaluation: BaseSubmissionResult, oldTurn: Turn) {

    const board =
        utilities.boardArrayToString(evaluation.newBoard);
    let prisonersOfBlack = oldTurn.resultState.prisonersOfBlack;
    let prisonersOfWhite = oldTurn.resultState.prisonersOfWhite;

    if (evaluation.capturedStones > 0) {
        if (oldTurn.turnPlayerColor == STONE_WHITE) {
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