<h1 align="center"> Setup Firesstore Database </h1> <br>
<p align="left">
Open the same Firebase project where you added email/password Authentication.
</p>
<p align="left">
Click on the large "Cloud Firestore" card.
</p>


<p align="left">
Use the "Start Collection" link to add the  following four empty collections in Firebase Firestore Database.  (Sorry, Firebase does not provide a way to import this schema, it must be entered manually)
</p>

go-player {
    id: string;
    name: string;
    location: string;
    bio: string;
    rankInfo: string;
    status: string;
    uid: string;  //id from FireBase Authentication
    createDate: string;
}

go-match {
    id: string;
    board: string;
    nextTurnPlayer: string;
    playerBlackId: string;
    playerWhiteId: string;
    playerBlackName: string;
    playerWhiteName: string;
    turnNumber: number;
    status: string;
    createDate: string;
    updateDate: string;
}

go-turn {
    id: string;
    matchId: string;
    turnPlayerColor: string;
    turnNumber: number;
    playerBlackId: string;
    playerWhiteId: string;
    playerBlackName: string;
    playerWhiteName: string;
    koCompareState: 
       {
          board: string;
          prisonersOfBlack: number;
          prisonersOfWhite: number;
       }
    initialState: 
       {
          board: string;
          prisonersOfBlack: number;
          prisonersOfWhite: number;
       }
    resultState: 
       {
          board: string;
          prisonersOfBlack: number;
          prisonersOfWhite: number;
       }
    action: 
       {
          actionType: string;
          location: { row: number, col: number } | null;
       }       
    isValid: boolean;
    isKo: boolean;
    comments: string;
    createDate: string;
    updateDate: string;
}

messages {
  id: string;
  message: string;
  matchId: string;
  speakerName: string;
  createDate: string;
}

