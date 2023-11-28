import { useLocation, useNavigate } from "react-router-dom";
import { TURN_COLLECTION, Turn, addTurn, updateMatch } from "../../firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { Submission, evaluateSubmission } from "../../services/moveProcessor";
import submissionFactory from "../../services/submissionFactory";
import { PlayerContext } from "../../contexts/PlayerContext";
import turnFactory from "../../services/turnFactory";
import utilities from "../../services/moveProcessor/UtilityFunctions"
import { query, where, collection, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import GoGameBoard from "./GoGameBoard";
import Chat from "../Chat";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter,  AlertDialogOverlay, Button, HStack, useDisclosure } from "@chakra-ui/react";
import './GoBoard.css'

const GoArena
  = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [play, setPlay] = useState<{ row: number, col: number } | null>(null)

    const [turn, setTurn] = useState<Turn | null>()
    const location = useLocation();
    const player = useContext(PlayerContext)
    const navigate = useNavigate();

    /// TBD TBD TBD make page recover from no match in location
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
      setPlay({ row: row, col: col });
      onOpen();
    }

    const executeStonePlay = () => {
      doStonePlay(turn, player?.id ?? "", play?.row ?? -1, play?.col ?? -1);
      onClose();
    }

    const doStonePlay = (turn: Turn | null | undefined, userId: string, row: number, col: number) => {

      if (turn) {
        const submission: Submission =
          submissionFactory.createSubmission(turn, userId, row, col);
        const evaluation = evaluateSubmission(submission);
        if (evaluation.isLegalPlay) {
          const newTurn = turnFactory.createTurn(turn, evaluation, submission);
          setTurn(newTurn);
          addTurn(newTurn).then(() => {
            updateMatch(location.state.match, newTurn);
          });
        }
        // else{//    TBD      put alert here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  TBD
      }
    }

    const handlePass = (turn: Turn | null | undefined, userId: string) => {
      if (turn) {

        const newTurn = turnFactory.createPassTurn(turn, userId);
        setTurn(newTurn);
        addTurn(newTurn).then(() => {
          updateMatch(location.state.match, newTurn);
        });
      }
    }

    try {

      return (<>


        <div className="areanGameBoard">
          {turn && <GoGameBoard boardString={turn?.resultState.board ?? ""} isMyTurn={utilities.getIsMyTurn(turn, player)} onSelectIntersection={onSelectIntersection} expressRowAndColumnLabels={true} />}
        </div>

        <HStack spacing='24px'>
          <Button onClick={() => { navigate("/") }}>Home</Button>

          {utilities.getIsMyTurn(turn, player) && <Button onClick={() => handlePass(turn, player?.id ?? "")}>Pass</Button>}
          <div> {utilities.getStoneColorOfCurrentPlayer(player?.id ?? "", turn)}</div>
          <div>{utilities.getIsMyTurn(turn, player) ? "myturn" : "notMyTurn"}</div>
          <div>{(turn?.turnNumber ?? 0) + 1}</div>
        </HStack >
        <Chat match={location.state.match}></Chat>


        <AlertDialog
          motionPreset='slideInBottom'
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent style={{ width: "200px", fontWeight: "bold", marginTop: "10px", marginLeft: "10px" }} >


              <AlertDialogBody >
                You chose to play at: {play?.row} {play?.col} OK?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={executeStonePlay} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
      );
    } catch (e) {
      console.log("Error displaying component:  probably no match: ", location.state);
      ///TBD TBD TBD  test if "missing match" is issue and show toast.
      navigate("/");
    }
  }


export default GoArena