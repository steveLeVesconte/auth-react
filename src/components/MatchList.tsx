import { useContext, useEffect, useState } from "react";
import { Match, getActiveMatchesForPlayerId } from "../firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { PlayerContext, PlayerContextType } from "../contexts/PlayerContext";
import GameCard from "./GameCard";
import { SimpleGrid } from "@chakra-ui/react";

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
  }, [player, currentUser]);

  const handleSelect = (selectedMatch: Match) => {
    console.log("in handleSelect=(selectedMatch:Match)", selectedMatch);
    navigate("/go-board", { state: { match: selectedMatch } });
  };

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
        {matches &&
          matches.map((match) => (
            <div key={match.id}>
              <button onClick={() => handleSelect(match)}>
                <GameCard match={match} userId={ player?.id ?? ""}></GameCard>
              </button>
            </div>
          ))}
      </SimpleGrid>
    </>
  );
}
