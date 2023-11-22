//import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GameAction, Match, TURN_COLLECTION, Turn, addTurn, getLatestTurnForMatchId, setMatchTurnNumber} from "../firestore";
import { useContext, useEffect, useState } from "react";

import BoardRow from "./GoBoard/BoardRow";
import { Submission, evaluateSubmission } from "../services/moveProcessor";
import submissionFactory from "../services/submissionFactory";
import {PlayerContext} from "../contexts/PlayerContext";
import turnFactory from "../services/turnFactory";
import utilities from "../services/moveProcessor/UtilityFunctions"
import { query, where, collection, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";



const GoBoard
    = () => {
        const [turn, setTurn] = useState<Turn|null>()
        const location = useLocation();
        const player=useContext(PlayerContext)
      //  const [match, setMatch] = useState<Match|null>()
      

          console.log(location, "gggggggggggggggggggggg useLocation Hook");
          console.log(location.state.match, "ggggggggggggggggggggggmmmmmmmmmmmm match in useLocation Hook");

        useEffect(()=> {
            const turnQuery=query(collection(db,TURN_COLLECTION), where("matchId","==",location.state.match.id) , orderBy("createDate", "desc"),limit(1) );
            onSnapshot(turnQuery,(querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    const latestTurn={...doc.data(), id: doc.id} as Turn;
                    console.log('turn latestTurn *********',latestTurn);
                    setTurn(latestTurn);
                });
                console.log('turn querySnapshot *********ddddddddd',querySnapshot);
             //   setTurn(querySnapshot as Turn);

            })
            
           // const querySnapshot= await getDocs(turnQuery);
        
        //    console.log('turn querySnapshot',querySnapshot);
        //     if(querySnapshot?.docs.length>0)
        //     {
        //         const turn:Turn = querySnapshot.docs[0].data() as Turn;
        //         return turn;
        //    }



        //     async function getData() {
        //     if(location.state.match){
        //        const latestTurn=await getLatestTurnForMatchId(location.state.match.id);
        //        setTurn(latestTurn);
        // //     }
        // }
        // getData();
        },[]
        );
        // useEffect(()=> {
        //     async function getData() {
        //     if(location.state.match){
        //        const latestTurn=await getLatestTurnForMatchId(location.state.match.id);
        //        setTurn(latestTurn);
        //     }
        // }
        // getData();
        // },[]
        // );

        const onSelectIntersection=(row:number,col:number):void=>{

            console.log('onSelectIntersection  row col: ', row,col)
            handleStonePlay(turn,player?.id??"",row,col);
                
            }
        
    
        const handleStonePlay=(turn:Turn|null|undefined,userId:string, row:number, col:number)=>{
            if(turn){
            const submission: Submission =
            submissionFactory.createSubmission(turn, userId, row, col);
          const evaluation = evaluateSubmission(submission);
          if(evaluation.isLegalPlay){
            const newTurn = turnFactory.createTurn(turn,evaluation,submission);
            setTurn(newTurn);
            console.log('new turn: ', newTurn)
            addTurn(newTurn).then(()=>{
            setMatchTurnNumber(location.state.match,turn?.turnNumber);
            });
          }
          console.log ('5234523452345324  evaluation: ',evaluation);
            }
        }




    //     console.log(' turn  --  yxxxxxxxxxxxxxxxxxxx',turn);
      
    //    //const turnString='_bwbw_wbbwbwbwb____,bw__b__w_____w_____,___w_______________,__b________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________';
    //     const turnString=turn?.resultState.board??"";
    //     const rowStringsArray:string[]=turnString.split(',');
    //     console.log(' rowStringArrayxxxxxxxxxxxxxxxxxxx',rowStringsArray);
    //     const content = [];
   
    //    // rowStringsArray.forEach(r=>{content.push(<BoardRow row={x} content="_________b_________"/>);})

    //     for(let x=0; x<19; x++) {
    //       content.push(<BoardRow row={x} content={rowStringsArray[x]}/>);
    //     }
       return(<>

        <h1>{location.state.match?.id} {location.state.match?.playerBlackName} {location.state.match?.playerWhiteName} turn number {location.state.match?.turnNumber}</h1>
        <h1> {turn?.playerBlackName} {turn?.playerWhiteName} turn-turnNumber: {turn?.turnNumber} player of last turn: {turn?.turnPlayerColor} x {turn?.resultState.board}x</h1>
        {createRows(turn,onSelectIntersection, utilities.getIsMyTurn(turn,player))}
        <Link to="/">Home</Link>
        <div>{utilities.getIsMyTurn(turn,player)?"myturn":"notMyTurn"}</div>
        </>
       );


       

    }


    const createRows=(turn:Turn|null|undefined,onSelectIntersection:(row:number, col:number)=>void,isMyTurn:boolean):JSX.Element[]=>{
        console.log(' turn turn turn xxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxx',turn);
        const content:JSX.Element[] = [];
      if(turn){
        const turnString=turn?.resultState.board??"";
        const rowStringsArray:string[]=turnString.split(',');
        console.log(' rowStringArrayxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxx ',rowStringsArray);
        //const content:JSX.Element[] = [];
   
       // rowStringsArray.forEach(r=>{content.push(<BoardRow row={x} content="_________b_________"/>);})

        for(let x=0; x<19; x++) {
          content.push(<BoardRow key={x} row={x} content={rowStringsArray[x]} isMyTurn={isMyTurn} onSelectIntersection={onSelectIntersection}/>);
        }
    }
        return content;
    }

    // const onSelectIntersection=(row:number,col:number):void=>{
    //     const [turn] = useState<Turn|null>()
    //      const player=useContext(PlayerContext)
    //     console.log('onSelectIntersection  row col: ', row,col)
    //     handleStonePlay(turn,player?.id??"",row,col)
           
    //     }
    

    // const handleStonePlay=(turn:Turn|null|undefined,userId:string, row:number, col:number)=>{
    //     if(turn){
    //     const submission: Submission =
    //     submissionFactory.createSubmission(turn, userId, row, col);
    //   const evaluation = evaluateSubmission(submission);
    //   console.log ('5234523452345324  evaluation: ',evaluation);
    //     }
    // }



    export default GoBoard