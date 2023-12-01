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
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import './GoBoard.css'
import { PlayerCard } from "./PlayerCard";
import { LogoCard } from "./LogoCard";
import { ActionCard } from "./ActionCard";
import NavCard from "./NavCard";

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
      });
      /*       const colorOfOppoent=utilities.getStoneColorOfPrevTrunOpponent(player?.id ?? "", turn);
            const idOfOppoent=utilities.getStoneColorOfCurrentPlayer(player?.id ?? "", turn);
            
            playerWhiteId
            getPlayer(location.state.match.onSubmit) */
    }, []
    );

    const onSelectIntersection = (row: number, col: number): void => {
      setPlay({ row: row, col: col });
      onOpen();
    }

    const executeStonePlay = () => {
      doStonePlay(turn,  play?.row ?? -1, play?.col ?? -1);
      onClose();
    }

    const doStonePlay = (turn: Turn | null | undefined,  row: number, col: number) => {

      if (turn) {
        const submission: Submission =
          submissionFactory.createSubmission(turn,  row, col);
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

    // const wideTemplate=`"LO BB HE"
    //                     "YO BB OP"
    //                     "AC BB CH"`;


    // const narrowTemplate=`"BB"
    //                       "CH"
    //                       "AC"
    //                       "YO"
    //                       "OP"
    //                       "HE"
    //                       "LO"`;

    const noOp = () => { };

    const handlePass = (turn: Turn | null | undefined) => {
      if (turn) {
        const newTurn = turnFactory.createPassTurn(turn);
        setTurn(newTurn);
        addTurn(newTurn).then(() => {
          updateMatch(location.state.match, newTurn);
        });
      }
    }

    try {

      return (<>
        <Grid className="game-arena-grid"
        /*       gridTemplateColumns={{ base: "1fr", md: "30vh 100vh 30vh" }} */
        >
          <GridItem area={"BB"}  ><div>     <div className="areanGameBoard">
            {turn && <GoGameBoard boardString={turn?.resultState.board ?? ""} isMyTurn={utilities.getIsMyTurn(turn, player)} onSelectIntersection={onSelectIntersection} expressRowAndColumnLabels={true} />}
          </div> </div></GridItem>
          <GridItem area={"AC"}  ><ActionCard /></GridItem>
          <GridItem area={"CH"}  ><div>      <Chat match={location.state.match}></Chat>
          </div></GridItem>
          <GridItem h="100%" area={"YO"}  ><PlayerCard
            stoneColor={utilities.getStoneColorOfPlayer(player?.id ?? "", turn)}
            playerName={player?.name ?? ""}
            oppoenentName={utilities.getNameOfOpponent(player?.id ?? "", turn)}

            isMyTurn={utilities.getIsMyTurn(turn, player)}
            prisoners={utilities.getPrisonersOfCurrentPlayer(player?.id ?? "", turn)}
            isPlayer={true}
            onPass={() => handlePass(turn)} /></GridItem>
          <GridItem h="100%" area={"OP"}  >
            <PlayerCard
              stoneColor={utilities.getStoneColorOfOpponent(player?.id ?? "", turn)}
              playerName={utilities.getNameOfOpponent(player?.id ?? "", turn)}
              oppoenentName={player?.name ?? ""}

              isMyTurn={!utilities.getIsMyTurn(turn, player)}
              prisoners={utilities.getPrisonersOfOpponent(player?.id ?? "", turn)}
              isPlayer={false}
              onPass={() => noOp()}

            /></GridItem>
          <GridItem className="grid-item-he" area={"HE"}  >
            <NavCard></NavCard>
            {/*               <Box className="cardBox">
                <Card  h="100%">
      <CardBody>
                  <div>Lorem ipsum dolor
                   </div>
                   </CardBody>
                   </Card>
                   </Box> */}
          </GridItem>
          <GridItem className="test" area={"LO"} ><LogoCard /></GridItem>
        </Grid>

        {/*        <div className="areanGameBoard">
          {turn && <GoGameBoard boardString={turn?.resultState.board ?? ""} isMyTurn={utilities.getIsMyTurn(turn, player)} onSelectIntersection={onSelectIntersection} expressRowAndColumnLabels={true} />}
        </div> */}

        {/*         <HStack spacing='24px'>
          <Button onClick={() => { navigate("/") }}>Home</Button>

          {utilities.getIsMyTurn(turn, player) && <Button onClick={() => handlePass(turn, player?.id ?? "")}>Pass</Button>}
          <div> {utilities.getStoneColorOfCurrentPlayer(player?.id ?? "", turn)}</div>
          <div>{utilities.getIsMyTurn(turn, player) ? "myturn" : "notMyTurn"}</div>
          <div>{(turn?.turnNumber ?? 0) + 1}</div>
        </HStack > */}
        {/*  <Chat match={location.state.match}></Chat>
 */}

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