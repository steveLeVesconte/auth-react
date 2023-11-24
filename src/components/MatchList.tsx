import { useContext, useEffect, useState } from "react"
import {Match, getActiveMatchesForPlayerId} from "../firestore"
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import {PlayerContext} from "../contexts/PlayerContext";
import GameCard from "./GameCard";
import { SimpleGrid } from "@chakra-ui/react";

// interface ListProps {

  
//     // 👇️ turn off type checking
//     playerId: (params: string) => void;
//   }

export default function MatchList(){




const [matches, setMatches] = useState<Match[]|null>([])
const {  currentUser } = useAuth();//from AuthContext
const navigate=useNavigate();

const currentPlayer=useContext(PlayerContext);


useEffect(()=>{
    console.log('in matchlist use effect')
 //   console.log('in playerlist use effect - user: ', currentUser);
    async function getData() {
    if(currentUser){
       const myActiveMatches=await getActiveMatchesForPlayerId(currentPlayer?.id??"");
    //    const x = allPlayers[0].name;
    //    const y:string = currentUser.uid as string;
    //    console.log(y+x);

    setMatches(myActiveMatches);
   // setPlayers(allPlayers.filter(p=>currentUser.uid !==p.uid));
    //console.log('in playerlist use effect - list: ', players);
    }
}
getData();
},[currentPlayer,currentUser]
);

const handleSelect=(selectedMatch:Match)=>{
    console.log("in handleSelect=(selectedMatch:Match)", selectedMatch)
    navigate('/go-board', {state:{match: selectedMatch}})
//selectMatch(selectedMatch);
}

return (
    <>
{/*     <div>Match List</div> */}
    {
       // console.log("in return - matches", matches)
    }
          <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
    {matches && matches.map((match)=>(
        <div key={match.id}>
           {/*  <GameCard  match={match}></GameCard> */}
<button  onClick={()=>handleSelect(match)}><GameCard  match={match}></GameCard></button>
        </div>
    ))}
    </SimpleGrid>
    </>
)


}