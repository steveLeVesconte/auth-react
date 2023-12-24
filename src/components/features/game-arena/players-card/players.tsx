import { Player } from "../../../../services/data/player-service";
import { PlayerCard } from "./player-card";
import utilities from "../../../../services/moveProcessor/UtilityFunctions";
import { Turn } from "../../../../services/data/turn-service";

interface Props {
  player: Player | null;
  turn: Turn | null | undefined;
}

export const Players = (props: Props) => {
  return (
    <>
      <PlayerCard
        stoneColor={utilities.getStoneColorOfPlayer(
          props.player?.id ?? "",
          props.turn
        )}
        playerName={props.player?.name ?? ""}
        isMyTurn={utilities.getIsMyTurn(props.turn, props.player)}
        prisoners={utilities.getPrisonersOfCurrentPlayer(
          props.player?.id ?? "",
          props.turn
        )}
        isPlayer={true}
      />

      <PlayerCard
        stoneColor={utilities.getStoneColorOfOpponent(
          props.player?.id ?? "",
          props.turn
        )}
        playerName={utilities.getNameOfOpponent(
          props.player?.id ?? "",
          props.turn
        )}
        isMyTurn={!utilities.getIsMyTurn(props.turn, props.player)}
        prisoners={utilities.getPrisonersOfOpponent(
          props.player?.id ?? "",
          props.turn
        )}
        isPlayer={false}
      />
    </>
  );
};
