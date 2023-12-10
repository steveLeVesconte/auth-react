import { useEffect, useState } from "react"
import {Player, getPlayersAll} from "../firestore"
import { useAuth } from '../contexts/AuthContext'
//import { Button, Card, CardBody, Select} from "@chakra-ui/react";


/* interface ListProps {

  

    selectPlayer: (params: Player) => void;
  } */

export default function PlayerList(){




const [players, setPlayers] = useState<Player[]>([])
const {  currentUser } = useAuth();//from AuthContext





useEffect(()=>{
    console.log('in playerlist use effect')
 //   console.log('in playerlist use effect - user: ', currentUser);
    async function getData() {
    if(currentUser){
       const allPlayers=await getPlayersAll();
    //    const x = allPlayers[0].name;
    //    const y:string = currentUser.uid as string;
    //    console.log(y+x);

        setPlayers(allPlayers.filter(p=>currentUser.uid !==p.uid));
        //console.log('in playerlist use effect - list: ', players);
    }
}
getData();
},[]
);

/* const handleSelect=(selectedPlayer:Player)=>{
selectPlayer(selectedPlayer);
} */

return (
    <>

                                {players.map((player)=>(
          <option  value={player.id + "_"+ player.name} >{player.name}</option>

    ))}
                             

{/* 
    <div className="player-card-grid">
    {players.map((player)=>(
        <Card className="player-card"
       key={player.id}>
        <CardBody>
          <div> {player.name}</div> 
          <div> {player.uid} </div> 
          <div> <Button  onClick={()=>handleSelect(player)}>{player.name}</Button></div> 
            </CardBody>
        </Card>
    ))}
    </div> */}
    </>
)


}
