import { STONE_WHITE } from "../constants";
import { Player } from "./data/player-service";

export const stoneColorDependentValues=(player:Player|null, userStoneColor:string,opponentId:string, opponentName:string )=>{
    let playerBlackId = player?.id;
    let playerBlackName = player?.name;
    let playerWhiteId = opponentId;
    let playerWhiteName = opponentName;
    if (userStoneColor == STONE_WHITE) {
      playerBlackId = opponentId;
      playerBlackName = opponentName;
      playerWhiteId = player?.id ?? "";
      playerWhiteName = player?.name ?? "";
    }   

    return {playerBlackId,playerBlackName,playerWhiteId,playerWhiteName}
}

