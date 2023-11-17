import { useContext, useEffect, useState } from "react"
import {Match, getActiveMatchesForPlayerId} from "../firestore"
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import {PlayerContext} from "../contexts/PlayerContext";

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
    navigate('/go-board', {state:{...selectedMatch}})
//selectMatch(selectedMatch);
}

return (
    <>
    <div>Match List</div>
    {
        console.log("in return - matches", matches)
    }
    {matches && matches.map((match)=>(
        <div key={match.id}>
           {match.playerBlackId} {match.playerBlackName} {match.playerWhiteName} {match.createDate} <button  onClick={()=>handleSelect(match)}>Select</button>
        </div>
    ))}
    </>
)


}