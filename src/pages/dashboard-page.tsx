import { useNavigate } from "react-router-dom";
import { Alert, AlertIcon, Button, Center, Flex, Heading } from "@chakra-ui/react";
import MatchList from "../components/features/match-list/match-list";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {  Match,  getActiveMatchesForPlayerId,} from "../services/data/match-service";
import { PlayerContext, PlayerContextType } from "../contexts/PlayerContext";
import { useGameStateStore } from "../stores/game-state-store";

const Dashboard = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[] | null>([]);
  const { currentUser } = useAuth(); //from AuthContext
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const updatePendingAction = useGameStateStore(state=>state.updatePendingAction);
  const updateLastAction = useGameStateStore(state=>state.updateLastAction);

  useEffect(() => {
     updatePendingAction(null);
     updateLastAction(null);
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

  return (
    <>
      <Heading as="h1" marginY={5} fontSize="5xl" whiteSpace="nowrap">
        Active Matches ({matches?.length})
      </Heading>
      <Flex>
        <Center>
        <Button onClick={() => navigate("/create-match")} height="48px" flex="grow">New Match</Button> 
        </Center>
        <Alert status="info" variant="solid" marginLeft="20px" flex="grow" >
        <AlertIcon />
        Click on a listed match (if any) or click on 'New Match'.
      </Alert>
      </Flex>
      <MatchList matches={matches}></MatchList>
    </>
  );
};

export default Dashboard;




