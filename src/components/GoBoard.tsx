//import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Match, Turn, getLatestTurnForMatchId } from "../firestore";
import { useEffect, useState } from "react";

import BoardRow from "./GoBoard/BoardRow";



const GoBoard
    = () => {
        const [turn, setTurn] = useState<Turn|null>()
        const location = useLocation();
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
        },[location.state.match]
        );
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

        <h1>{location.state.match?.id} {location.state.match?.playerBlackName} {location.state.match?.playerWhiteName} {location.state.match?.turnNumber}</h1>
        <h1> {turn?.playerBlackName} {turn?.playerWhiteName} {turn?.turnNumber} x {turn?.initialState.board}x</h1>
        {createRows(turn)}
        </>
       )

    }


    const createRows=(turn:Turn|null|undefined):JSX.Element[]=>{
        console.log(' turn turn turn xxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxx',turn);
        const content:JSX.Element[] = [];
      if(turn){
        const turnString=turn?.resultState.board??"";
        const rowStringsArray:string[]=turnString.split(',');
        console.log(' rowStringArrayxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxx ',rowStringsArray);
        //const content:JSX.Element[] = [];
   
       // rowStringsArray.forEach(r=>{content.push(<BoardRow row={x} content="_________b_________"/>);})

        for(let x=0; x<19; x++) {
          content.push(<BoardRow key={x} row={x} content={rowStringsArray[x]}/>);
        }
    }
        return content;
    }


    export default GoBoard