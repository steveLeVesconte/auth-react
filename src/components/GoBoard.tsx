//import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GameAction, Match, Turn, addTurn, getLatestTurnForMatchId } from "../firestore";
import { useContext, useEffect, useState } from "react";

import BoardRow from "./GoBoard/BoardRow";
import { Submission, evaluateSubmission } from "../services/moveProcessor";
import submissionFactory from "../services/submissionFactory";
import {PlayerContext} from "../contexts/PlayerContext";
import turnFactory from "../services/turnFactory";
import utilities from "../services/moveProcessor/UtilityFunctions"



const GoBoard
    = () => {
        const [turn, setTurn] = useState<Turn|null>()
        const location = useLocation();
        const player=useContext(PlayerContext)
      //  const [match, setMatch] = useState<Match|null>()
      

          console.log(location, "gggggggggggggggggggggg useLocation Hook");
          console.log(location.state.match, "ggggggggggggggggggggggmmmmmmmmmmmm match in useLocation Hook");

   //   setMatch(location?.state.match as Match);
  //    console.log(match, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm useLocation Hook");
    

        useEffect(()=> {
            console.log('in goboard use effect    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
         //   console.log('in playerlist use effect - user: ', currentUser);
            async function getData() {
                console.log('match.id  xxxxxxxxxxxxxxxvvvvvvvvvvvvvvvvvvvvvvvvvv',location.state.match?.id);
            if(location.state.match){
               const latestTurn=await getLatestTurnForMatchId(location.state.match.id);
               console.log('latestTurn  vvvvvvvvvvvvvvvvvvvvvvvvvv',latestTurn);
        
               setTurn(latestTurn);

            //    const x = allPlayers[0].name;
            //    const y:string = currentUser.uid as string;
                console.log('turn  vvvvvvvvvvvvvvvvvvvvvvvvvv',turn);
        
            //     setPlayers(allPlayers.filter(p=>currentUser.uid !==p.uid));
                //console.log('in playerlist use effect - list: ', players);
                console.log(' turn  --  yxxxxxxxxxxxxxxxxxxx',turn);
      
                //const turnString='_bwbw_wbbwbwbwb____,bw__b__w_____w_____,___w_______________,__b________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________';
  /*                const turnString=turn?.resultState.board??"";
                 const rowStringsArray:string[]=turnString.split(',');
                 console.log(' rowStringArrayxxxxxxxxxxxxxxxxxxx',rowStringsArray);
                 const content = [];
             */
                // rowStringsArray.forEach(r=>{content.push(<BoardRow row={x} content="_________b_________"/>);})
         
                //  for(let x=0; x<19; x++) {
                //    content.push(<BoardRow row={x} content={rowStringsArray[x]}/>);
                //  }

            }
        }
        getData();
        },[]
        );


        const onSelectIntersection=(row:number,col:number):void=>{

            console.log('onSelectIntersection  row col: ', row,col)
            handleStonePlay(turn,player?.id??"",row,col)
               
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
            addTurn(newTurn);

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