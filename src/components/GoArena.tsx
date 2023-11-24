import {  useLocation, useNavigate } from "react-router-dom";
import { TURN_COLLECTION, Turn, addTurn,  updateMatch } from "../firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { Submission, evaluateSubmission } from "../services/moveProcessor";
import submissionFactory from "../services/submissionFactory";
import { PlayerContext } from "../contexts/PlayerContext";
import turnFactory from "../services/turnFactory";
import utilities from "../services/moveProcessor/UtilityFunctions"
import { query, where, collection, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import GoGameBoard from "./GoArena/GoGameBoard";
import Chat from "./Chat";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack, useDisclosure } from "@chakra-ui/react";

const GoArena
  = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef =useRef<HTMLButtonElement>(null);
    const [play, setPlay]=useState<{row:number, col:number}|null>(null)

    const [turn, setTurn] = useState<Turn | null>()
    const location = useLocation();
    const player = useContext(PlayerContext)
    const navigate = useNavigate();
    console.log('in in in !!!!!!!!!!!!!!!!!!!!!!! arena  turn location: ',location);
     
    useEffect(() => {
      const turnQuery = query(collection(db, TURN_COLLECTION), where("matchId", "==", location.state.match.id), orderBy("createDate", "desc"), limit(1));
      console.log('!!!!!!!!!!!!!!!!!!!!!!! arena  turn qury: ',turnQuery);
        
      onSnapshot(turnQuery, (querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          console.log('arena found querySnapshot: ',querySnapshot);
      
          const latestTurn = { ...doc.data(), id: doc.id } as Turn;
          console.log('arena found turn: ',latestTurn);
          setTurn(latestTurn);
        });
      })
    }, []
    );

    const onSelectIntersection = (row: number, col: number): void => {
     // handleStonePlay(turn, player?.id ?? "", row, col);
     setPlay({row:row,col:col});
     onOpen();
     // handleStonePlay(turn, player?.id ?? "", row, col);
    }
    // const handleStonePlay = (turn: Turn | null | undefined, userId: string, row: number, col: number) => {
    //   if (turn) {
    //     const submission: Submission =
    //       submissionFactory.createSubmission(turn, userId, row, col);
    //     const evaluation = evaluateSubmission(submission);
    //     if (evaluation.isLegalPlay) {
    //       const newTurn = turnFactory.createTurn(turn, evaluation, submission);
    //       setTurn(newTurn);
    //       addTurn(newTurn).then(() => {
    //        // setMatchTurnNumber(location.state.match, turn?.turnNumber);
    //         updateMatch(location.state.match, newTurn);
    //       });
    //     }
    //     else{

    //     }
    //   }
    // }
    // const handleStonePlay = (turn: Turn | null | undefined, userId: string, row: number, col: number) => {
    //   if (turn) {
    //     onOpen();
    //   }
      //   const submission: Submission =
      //     submissionFactory.createSubmission(turn, userId, row, col);
      //   const evaluation = evaluateSubmission(submission);
      //   if (evaluation.isLegalPlay) {
      //     const newTurn = turnFactory.createTurn(turn, evaluation, submission);
      //     setTurn(newTurn);
      //     addTurn(newTurn).then(() => {
      //      // setMatchTurnNumber(location.state.match, turn?.turnNumber);
      //       updateMatch(location.state.match, newTurn);
      //     });
      //   }
      //   else{

      //   }
      // }
   // }
    const executeStonePlay=()=>{
       doStonePlay(turn,player?.id??"",play?.row??-1, play?.col??-1);
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
           // setMatchTurnNumber(location.state.match, turn?.turnNumber);
            updateMatch(location.state.match, newTurn);
          });
        }
        // else{//    TBD      put alert here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  TBD

        // }
      }
    }

    const handlePass = (turn: Turn | null | undefined, userId: string) => {
      if (turn) {
        // const submission: Submission =
        //   submissionFactory.createSubmission(turn, userId, row, col);
        // const evaluation = evaluateSubmission(submission);
        // if (evaluation.isLegalPlay) {
          const newTurn = turnFactory.createPassTurn(turn, userId);
          setTurn(newTurn);
          addTurn(newTurn).then(() => {
           // setMatchTurnNumber(location.state.match, turn?.turnNumber);
            updateMatch(location.state.match, newTurn);
          });
        //}
      }
    }

    return (<>

{/*       <h1>{location.state.match?.id} {location.state.match?.playerBlackName} {location.state.match?.playerWhiteName} turn number {location.state.match?.turnNumber}</h1>
      <h1> {turn?.playerBlackName} {turn?.playerWhiteName} turn-turnNumber: {turn?.turnNumber} player of last turn: {turn?.playerStoneColor} x {turn?.resultState.board}x</h1> */}
      <div className="boardContainer">
      {turn && <GoGameBoard boardString={turn?.resultState.board ?? ""} isMyTurn={utilities.getIsMyTurn(turn, player)} onSelectIntersection={onSelectIntersection} />}
      </div>
      <HStack spacing='24px'>
        <Button onClick={()=>{navigate("/")}}>Home</Button>
{/*       <Link to="/">Home</Link> */}
      {utilities.getIsMyTurn(turn, player) && <Button onClick={()=>handlePass(turn,player?.id??"")}>Pass</Button>}
     <div> {utilities.getStoneColorOfCurrentPlayer(player?.id??"", turn)}</div>
     <div>{utilities.getIsMyTurn(turn, player) ? "myturn" : "notMyTurn"}</div>
     <div>{(turn?.turnNumber??0)+1}</div>
      </HStack >
      <Chat match={location.state.match}></Chat>
      {/* <Button colorScheme='red' onClick={onOpen}>
          Delete Customer
        </Button> */}
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Customer
              </AlertDialogHeader>
  
              <AlertDialogBody>
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
  }

export default GoArena