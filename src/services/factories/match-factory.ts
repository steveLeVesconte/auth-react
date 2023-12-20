// import { StoneColor } from "../../constants";
// import { GameUserDto } from "../../repositories/dtos/GameUserDto";
// import { MatchDto } from "../../repositories/dtos/MatchDto";

// function createMatch(user1: GameUserDto, user2: GameUserDto, stoneColorOfUser1: StoneColor, handicap: number): MatchDto {

//   const newMatch: MatchDto = new MatchDto();
//   const forFutureUse = handicap;
//   console.log(forFutureUse);

//   if (stoneColorOfUser1 === StoneColor.Black) {
//     newMatch.playerBlackName = user1.name;
//     newMatch.playerBlackId = user1._id;
//     newMatch.playerWhiteName = user2.name;
//     newMatch.playerWhiteId = user2._id;
//   }
//   else {
//     newMatch.playerWhiteName = user1.name;
//     newMatch.playerWhiteId = user1._id;
//     newMatch.playerBlackName = user2.name;
//     newMatch.playerBlackId = user2._id;
//   }

//   newMatch.status = MATCH_STATUS_ACTIVE;
//   const dateStamp = new Date().toISOString();
//   newMatch.createdAt = dateStamp;
//   newMatch.updatedAt = dateStamp;
//   return newMatch;
// }

// const matchFactory = {
//   createMatch
// };

// export default matchFactory;