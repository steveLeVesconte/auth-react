import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlayerContext,
  PlayerContextType,
} from "../../../contexts/PlayerContext";
import GameCard from "../game-card/game-card";
import { SimpleGrid } from "@chakra-ui/react";
import { Match } from "../../../services/data/match-service";
import { useGameStateStore } from "../../../stores/game-state-store";

interface Props {
  matches: Match[] | null;
}

export default function MatchList(props: Props) {
  const navigate = useNavigate();
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const updatePendingAction = useGameStateStore(
    (state) => state.updatePendingAction
  );
  const handleSelect = (selectedMatch: Match) => {
    updatePendingAction(null);
    navigate("/go-board", { state: { match: selectedMatch } });
  };

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        paddingTop="10px"
      >
        {props.matches &&
          props.matches.map((match) => (
            <div key={match.id} onClick={() => handleSelect(match)}>
              <GameCard match={match} userId={player?.id ?? ""}></GameCard>
            </div>
          ))}
      </SimpleGrid>
    </>
  );
}
