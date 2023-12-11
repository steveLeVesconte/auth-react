import { useNavigate } from "react-router-dom";
import { Button, Heading } from "@chakra-ui/react";
import MatchList from "../components/MatchList";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Heading as="h1" marginY={5} fontSize="5xl">
        Games
      </Heading>
      <Button onClick={() => navigate("/create-match")}>New Match</Button>
      <MatchList></MatchList>
    </>
  );
};

export default Dashboard;
