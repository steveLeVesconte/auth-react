import { GameState } from "../services/data/turn-service";

export const STONE_BLACK = "b"
export const STONE_WHITE = "w"

export const    ACTION_STONE_PLAY="play";
export const    ACTION_PASS="pass"
export const    ACTION_EXIT="exit";
export const    ACTION_NEW_MATCH="new";

export const    MATCH_STATUS_ACTIVE="active";

export const    TURN_STATUS_ACTIVE="active";

export const    PLAYER_STATUS_ACTIVE="active";


// CONVIENENCE CONSTANTS
export const    EMPTY_BOARD=   
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

export const EMPTY_GAME_STATE= {
    board: EMPTY_BOARD,
    prisonersOfBlack: 0,
    prisonersOfWhite: 0,
  } as GameState;