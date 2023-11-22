import { Link, useLocation } from "react-router-dom";
import { TURN_COLLECTION, Turn, addTurn, setMatchTurnNumber, updateMatch } from "../firestore";
import { useContext, useEffect, useState } from "react";
import { Submission, evaluateSubmission } from "../services/moveProcessor";
import submissionFactory from "../services/submissionFactory";
import { PlayerContext } from "../contexts/PlayerContext";
import turnFactory from "../services/turnFactory";
import utilities from "../services/moveProcessor/UtilityFunctions"
import { query, where, collection, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import GoGameBoard from "./GoArena/GoGameBoard";
import Chat from "./Chat";

const GoArena
  = () => {
    const [turn, setTurn] = useState<Turn | null>()
    const location = useLocation();
    const player = useContext(PlayerContext)

    useEffect(() => {
      const turnQuery = query(collection(db, TURN_COLLECTION), where("matchId", "==", location.state.match.id), orderBy("createDate", "desc"), limit(1));
      onSnapshot(turnQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const latestTurn = { ...doc.data(), id: doc.id } as Turn;
          setTurn(latestTurn);
        });
      })
    }, []
    );

    const onSelectIntersection = (row: number, col: number): void => {
      handleStonePlay(turn, player?.id ?? "", row, col);
    }

    const handleStonePlay = (turn: Turn | null | undefined, userId: string, row: number, col: number) => {
      if (turn) {
        const submission: Submission =
          submissionFactory.createSubmission(turn, userId, row, col);
        const evaluation = evaluateSubmission(submission);
        if (evaluation.isLegalPlay) {
          const newTurn = turnFactory.createTurn(turn, evaluation, submission);
          setTurn(newTurn);
          addTurn(newTurn).then(() => {
           // setMatchTurnNumber(location.state.match, turn?.turnNumber);
            updateMatch(location.state.match, turn);
          });
        }
      }
    }

    return (<>

      <h1>{location.state.match?.id} {location.state.match?.playerBlackName} {location.state.match?.playerWhiteName} turn number {location.state.match?.turnNumber}</h1>
      <h1> {turn?.playerBlackName} {turn?.playerWhiteName} turn-turnNumber: {turn?.turnNumber} player of last turn: {turn?.turnPlayerColor} x {turn?.resultState.board}x</h1>
      <GoGameBoard boardString={turn?.resultState.board ?? ""} isMyTurn={utilities.getIsMyTurn(turn, player)} onSelectIntersection={onSelectIntersection} />
      <Chat match={location.state.match}></Chat>
      <Link to="/">Home</Link>
      <div>{utilities.getIsMyTurn(turn, player) ? "myturn" : "notMyTurn"}</div>
    </>
    );
  }

export default GoArena