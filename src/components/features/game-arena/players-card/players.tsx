//import { Box } from "@chakra-ui/react";
import { Player } from "../../../../services/data/player-service";
import { PlayerCard } from "./player-card";
import utilities from "../../../../services/moveProcessor/UtilityFunctions";
import { Turn } from "../../../../services/data/turn-service";
//import styles from "../players-card.module.css"

interface Props {
    player:Player|null;
    turn:Turn|null|undefined;
    //stoneColor: string;
    //prisoners: number;
    //playerName: string;
    //oppoenentName: string;
   // isMyTurn: boolean;
  }
  
  export const Players = (props: Props) => {
    return (<>
      {/*   <Box className={styles.playerBox}> */}
        <PlayerCard 
          stoneColor={utilities.getStoneColorOfPlayer(
            props.player?.id ?? "",
            props.turn
          )}
          playerName={props.player?.name ?? ""}
/*           oppoenentName={utilities.getNameOfOpponent(
            props.player?.id ?? "",
            props.turn
          )} */
          isMyTurn={utilities.getIsMyTurn(props.turn, props.player)}
          prisoners={utilities.getPrisonersOfCurrentPlayer(
            props.player?.id ?? "",
            props.turn
          )}
          isPlayer={true}
          /* onPass={() => handlePass(turn)}  *//*  TBD remove */
        />
    {/*   </Box> */}
     {/*  <Box className={styles.playerBox}> */}
        <PlayerCard
          stoneColor={utilities.getStoneColorOfOpponent(
            props.player?.id ?? "",
            props.turn
          )}
          playerName={utilities.getNameOfOpponent(props.player?.id ?? "", props.turn)}
/*           oppoenentName={props.player?.name ?? ""} */
          isMyTurn={!utilities.getIsMyTurn(props.turn, props.player)}
          prisoners={utilities.getPrisonersOfOpponent(
            props.player?.id ?? "",
            props.turn
          )}
          isPlayer={false}
        /*   onPass={() => noOp()} */ /*  TBD remove */
        />
      {/* </Box> */}
</>

    )
  }