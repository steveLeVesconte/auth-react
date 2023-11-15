import { useEffect, useState } from "react"
import {Player, getPlayersAll} from "../firestore"
import { useAuth } from '../contexts/AuthContext'

export default function PlayerList(){




const [players, setPlayers] = useState<Player[]>([])
const {  currentUser } = useAuth();//from AuthContext

useEffect(()=>{
    console.log('in playerlist use effect')
 //   console.log('in playerlist use effect - user: ', currentUser);
    async function getData() {
    if(currentUser){
       const allPlayers=await getPlayersAll();
       const x = allPlayers[0].name;
       const y:string = currentUser.uid as string;
       console.log(y+x);

        setPlayers(allPlayers.filter(p=>currentUser.uid !==p.uid));
        //console.log('in playerlist use effect - list: ', players);
    }
}
getData();
},[]
);


return (
    <>
    <div>Player List</div>
    {
        console.log("in return - players", players)
    }
    {players.map((player)=>(
        <div key={player.id}>
            {player.name} {player.uid}
        </div>
    ))}
    </>
)


}
