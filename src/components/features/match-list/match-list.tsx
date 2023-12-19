import { useContext, useEffect, useState } from "react";

import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { PlayerContext, PlayerContextType } from "../../../contexts/PlayerContext";
import GameCard from "../game-card/game-card";
import { SimpleGrid } from "@chakra-ui/react";
import { Match, getActiveMatchesForPlayerId } from "../../../services/match-service";

export default function MatchList() {
  const [matches, setMatches] = useState<Match[] | null>([]);
  const { currentUser } = useAuth(); //from AuthContext
  const navigate = useNavigate();
  const { player } = useContext(PlayerContext) as PlayerContextType;

  useEffect(() => {
    console.log("in matchlist use effect");
    async function getData() {
      if (currentUser) {
        const myActiveMatches = await getActiveMatchesForPlayerId(
          player?.id ?? ""
        );
        setMatches(myActiveMatches);
      }
    }
    getData();
  }, [player]);

  const handleSelect = (selectedMatch: Match) => {
    console.log("in handleSelect=(selectedMatch:Match)", selectedMatch);
    navigate("/go-board", { state: { match: selectedMatch } });
  };

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        paddingTop="10px"
      >
        {matches &&
          matches.map((match) => (
  
              <div  key={match.id} onClick={() => handleSelect(match)}>
                <GameCard match={match} userId={ player?.id ?? ""}></GameCard>
              </div>
       
          ))}
      </SimpleGrid>
    </>
  );
}
