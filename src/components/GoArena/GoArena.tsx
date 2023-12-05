import { useLocation, useNavigate } from "react-router-dom";
import { BoardContextInfo, GameAction, TURN_COLLECTION, Turn, addTurn, updateMatch } from "../../firestore";
import { createContext, useContext, useEffect,  useState } from "react";
import { Submission, evaluateSubmission } from "../../services/moveProcessor";
import submissionFactory from "../../services/submissionFactory";
import { PlayerContext } from "../../contexts/PlayerContext";
import turnFactory from "../../services/turnFactory";
import utilities from "../../services/moveProcessor/UtilityFunctions"
import { query, where, collection, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import GoGameBoard from "./GoGameBoard";
import Chat from "../Chat";
//import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Box, Button, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import {  Box,  Grid, GridItem } from "@chakra-ui/react";
import './GoBoard.css'
import { PlayerCard } from "./PlayerCard";
//import { LogoCard } from "./LogoCard";
import { ActionCard } from "./ActionCard";
//import NavCard from "./NavCard";
import NavBar from "../NavBar";
import { useToast } from '@chakra-ui/react'


export interface ContextPackage{ 
  pendingAction:GameAction|null|undefined;
  lastAction:GameAction|null|undefined;
  isPlayersTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
} 
const emptyPackage:ContextPackage={
  pendingAction: null,
  lastAction: null,
  isPlayersTurn: false,
  onSelectIntersection: function (): void {}
  }


export const StoneContext = createContext(emptyPackage);


const GoArena
  = () => {

   // const { isOpen, onOpen, onClose } = useDisclosure()
    //const cancelRef = useRef<HTMLButtonElement>(null);
    //const [play, setPlay] = useState<{ row: number, col: number } | null>(null)
    const [contextPackage, setContextPackage] = useState<ContextPackage>(emptyPackage)
    
    const [pendingAction, setPendingAction] = useState<GameAction|null>(null)
    const [lastAction, setLastAction] = useState<GameAction|null>(null)
    //const [pendingPlay, setPendingPlay] = useState<boolean>(false)
    const [pendingPass, setPendingPass] = useState<boolean>(false)
    //const [turnStatus, setPendingPass] = useState<boolean>(false)




    const [turn, setTurn] = useState<Turn | null>()
    const location = useLocation();
    const player = useContext(PlayerContext)
    const navigate = useNavigate();
    const toast = useToast();
    

    /// TBD TBD TBD make page recover from no match in location
    useEffect(() => {
      const turnQuery = query(collection(db, TURN_COLLECTION), where("matchId", "==", location.state.match.id), orderBy("createDate", "desc"), limit(1));
      onSnapshot(turnQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const latestTurn = { ...doc.data(), id: doc.id } as Turn;
          setTurn(latestTurn);
       
          setContextPackage(
            {pendingAction:null,
              lastAction:latestTurn.action,
              isPlayersTurn: utilities.getIsMyTurn(turn, player),
              onSelectIntersection:handleSelectIntersection
            })
        });
      });
      /*       const colorOfOppoent=utilities.getStoneColorOfPrevTrunOpponent(player?.id ?? "", turn);
            const idOfOppoent=utilities.getStoneColorOfCurrentPlayer(player?.id ?? "", turn);
            
            playerWhiteId
            getPlayer(location.state.match.onSubmit) */
    }, []
    );


/*       const toast = useToast()
      return (
        <Button
          onClick={() =>
            toast({
              title: 'Account created.',
              description: "We've created your account for you.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          }
        >
          Show Toast
        </Button>
      )
    } */

/*     const onSelectIntersection = (row: number, col: number): void => {
      setPlay({ row: row, col: col });
      onOpen();
    } */

    const handleSelectIntersection = (row: number, col: number): void => {
      console.log('************* onSelectIntersection: ',row,col);
      //console.log(...(contextPackage?);
      const newStoneContext:ContextPackage={
        pendingAction:{actionType: "play",location: { row: row, col: col }},
        lastAction:contextPackage?.lastAction,
        isPlayersTurn:utilities.getIsMyTurn(turn, player),
        onSelectIntersection:handleSelectIntersection
      }
     setContextPackage(newStoneContext);
     // setPendingAction( {actionType: "play",location: { row: row, col: col }});
      //console.log('************* setting pending action: ',pendingAction);
      //setPendingPlay({ row: row, col: col });
     // onOpen();
    }


    const executeStonePlay = () => {
      //console.log('executeStonePlay play:',pendingAction)
      doStonePlay(turn, contextPackage.pendingAction?.location?.row ?? -1, contextPackage.pendingAction?.location?.col ?? -1);
    //  setPendingPlay(null);
     // onClose();
    }

    const cancelStonePlay = () => {
    //  console.log('************* cancelStonePlay: ',pendingAction);
    
     // console.log('cancelStonePlay play:',pendingAction)
      //setPendingAction(null);
      const newStoneContext:ContextPackage={
        pendingAction:null,
        lastAction:contextPackage?.lastAction,
        isPlayersTurn:utilities.getIsMyTurn(turn, player),
        onSelectIntersection:handleSelectIntersection
      }
     setContextPackage(newStoneContext);
     // onClose();
    }

    const doStonePlay = (turn: Turn | null | undefined, row: number, col: number) => {

      if (turn) {
        const submission: Submission =
          submissionFactory.createSubmission(turn, row, col);
        const evaluation = evaluateSubmission(submission);
        if (evaluation.isLegalPlay) {
          const newTurn = turnFactory.createTurn(turn, evaluation, submission);
          setTurn(newTurn);
          addTurn(newTurn).then(() => {
            updateMatch(location.state.match, newTurn);
            const newStoneContext:ContextPackage={
              pendingAction:null,
              lastAction:newTurn.action,
              isPlayersTurn:utilities.getIsMyTurn(turn, player),
              onSelectIntersection:handleSelectIntersection
            }
           setContextPackage(newStoneContext);
  /*           setPendingAction(null);
            setLastAction(pendingAction); */
            console.log("about to toast");
            toast({
              title: 'Stone placment processed.',
              description: "Success.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          });
        }else{
        console.log("about to toast error");
        let reason="unknown";
        if(evaluation.isKo)
        {
          reason="Ko Rule Violation!";
        }
        if(evaluation.isSuicide){
          reason ="Suiside Rule Violation!";
        }


        toast({
          title: 'Illegal Move.',
          description: reason,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
       // setPendingAction(null);
        const newStoneContext:ContextPackage={
          pendingAction:null,
          lastAction:contextPackage?.lastAction,
          isPlayersTurn:utilities.getIsMyTurn(turn, player),
          onSelectIntersection:handleSelectIntersection
        }
       setContextPackage(newStoneContext);
      }
        // else{//    TBD      put alert here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  TBD
      }
    }


    const noOp = () => { };


    const selectPass = (): void => {
      setPendingPass(true);
     // onOpen();
    }
    const cancelPass = (): void => {
      setPendingPass(false);
     // onOpen();
    }

    const handlePass = (turn: Turn | null | undefined) => {
      if (turn) {
        const newTurn = turnFactory.createPassTurn(turn);
        setTurn(newTurn);
        addTurn(newTurn).then(() => {
          updateMatch(location.state.match, newTurn);
          setPendingPass(false);
          toast({
            title: 'You Passed.',
            description: "Success.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        });
      }
    }

/*     try { */

      return (<>
          <StoneContext.Provider value={contextPackage}>
        <div className="game-container">
          <NavBar></NavBar>

          <Grid className="arena-grid-container"
          /*       gridTemplateColumns={{ base: "1fr", md: "30vh 100vh 30vh" }} */
          >
            <GridItem className="goboard" area={"goboard"}  >
              <div>
             
                  {turn && <GoGameBoard boardString={turn?.resultState.board ?? ""} isMyTurn={utilities.getIsMyTurn(turn, player)} onSelectIntersection={handleSelectIntersection} expressRowAndColumnLabels={true} actionState={{pendingAction,lastAction}}/>}
                 </div>
            </GridItem>

            <GridItem className="players" area={"players"}>

            <Box className="player-box">
                          <PlayerCard
              stoneColor={utilities.getStoneColorOfPlayer(player?.id ?? "", turn)}
              playerName={player?.name ?? ""}
              oppoenentName={utilities.getNameOfOpponent(player?.id ?? "", turn)}

              isMyTurn={utilities.getIsMyTurn(turn, player)}
              prisoners={utilities.getPrisonersOfCurrentPlayer(player?.id ?? "", turn)}
              isPlayer={true}
              onPass={() => handlePass(turn)} />
              </Box>




            <Box className="player-box-2 ">
            <PlayerCard
                stoneColor={utilities.getStoneColorOfOpponent(player?.id ?? "", turn)}
                playerName={utilities.getNameOfOpponent(player?.id ?? "", turn)}
                oppoenentName={player?.name ?? ""}

                isMyTurn={!utilities.getIsMyTurn(turn, player)}
                prisoners={utilities.getPrisonersOfOpponent(player?.id ?? "", turn)}
                isPlayer={false}
                onPass={() => noOp()}

              />
              </Box>

</GridItem>

            <GridItem className="actions" area={"actions"}  >
              <ActionCard 
            /*    isPendingMove={!(pendingAction==null)} */
               isPendingMove={(!(contextPackage?.pendingAction==null))}
               isMyTurn={utilities.getIsMyTurn(turn, player)}
               onPlayConfirm={executeStonePlay}
               onPassConfirm={()=>{handlePass(turn);}}
               onPass={selectPass}
               isActiveGame={location.state.match.status=="active"} 
               isPendingPass={pendingPass} 
              turnNumber={turn?.turnNumber??0}
              turnStutus="yada yada"
              onResign={noOp}
              onPassCancel={cancelPass}
              onPlayCancel={cancelStonePlay}

              /></GridItem>
            <GridItem className="chat"   >      
              <Chat match={location.state.match}></Chat>
           </GridItem>

  {/*           <GridItem h="100%" area={"YO"}  ><PlayerCard
              stoneColor={utilities.getStoneColorOfPlayer(player?.id ?? "", turn)}
              playerName={player?.name ?? ""}
              oppoenentName={utilities.getNameOfOpponent(player?.id ?? "", turn)}

              isMyTurn={utilities.getIsMyTurn(turn, player)}
              prisoners={utilities.getPrisonersOfCurrentPlayer(player?.id ?? "", turn)}
              isPlayer={true}
              onPass={() => handlePass(turn)} /></GridItem>
            <GridItem h="100%" area={"OP"}  > */}
{/*               <PlayerCard
                stoneColor={utilities.getStoneColorOfOpponent(player?.id ?? "", turn)}
                playerName={utilities.getNameOfOpponent(player?.id ?? "", turn)}
                oppoenentName={player?.name ?? ""}

                isMyTurn={!utilities.getIsMyTurn(turn, player)}
                prisoners={utilities.getPrisonersOfOpponent(player?.id ?? "", turn)}
                isPlayer={false}
                onPass={() => noOp()}

              /></GridItem> */}
{/*             <GridItem className="grid-item-he" area={"HE"}  >
              <NavCard></NavCard>

            </GridItem>
            <GridItem className="test" area={"LO"} ><LogoCard /></GridItem> */}
          </Grid>
          {contextPackage?.pendingAction&&<Box>{contextPackage?.pendingAction?.actionType}</Box>}


         {/*  <AlertDialog
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
          </AlertDialog> */}
        </div>
        </StoneContext.Provider>
      </>
      );
/*     } catch (e) {
      console.log("Error displaying component:  probably no match: ", location.state);
      ///TBD TBD TBD  test if "missing match" is issue and show toast.
      navigate("/");
    } */
  }


export default GoArena

