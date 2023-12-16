
export const PLAYER_COLLECTION = 'go-players';
export const MATCH_COLLECTION = 'go-matches';
export const TURN_COLLECTION = "go-turn";

export interface Message {
    id: string;
    message: string;
    matchId: string;
    speakerName: string;
    createDate: string;
}
