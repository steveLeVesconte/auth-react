//import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Match, Turn, getLatestTurnForMatchId } from "../firestore";
import { useEffect, useState } from "react";



const GoBoard
    = () => {
        const [turn, setTurn] = useState<Turn|null>()
        const location = useLocation();
        const match:Match=location.state as Match;


        useEffect(()=>{
            console.log('in goboard use effect')
         //   console.log('in playerlist use effect - user: ', currentUser);
            async function getData() {
            if(match){
               const latestTurn=await getLatestTurnForMatchId(match.id);
               setTurn(latestTurn);

            //    const x = allPlayers[0].name;
            //    const y:string = currentUser.uid as string;
                console.log('latestTurn',latestTurn);
        
            //     setPlayers(allPlayers.filter(p=>currentUser.uid !==p.uid));
                //console.log('in playerlist use effect - list: ', players);
            }
        }
        getData();
        },[]
        );


       return(<>
        <h1>{match.id} {match.playerBlackName} {match.playerWhiteName} {match.turnNumber}</h1>
        <h1> {turn?.playerBlackName} {turn?.playerWhiteName} {turn?.turnNumber} x {turn?.initialState.board}x</h1>
        </>
       )

    }


    export default GoBoard