import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { Player, getPlayersAll } from "../services/player-service";

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const { currentUser } = useAuth(); //from AuthContext

  useEffect(() => {
    async function getData() {
      if (currentUser) {
        const allPlayers = await getPlayersAll();
        setPlayers(allPlayers.filter((p) => currentUser.uid !== p.uid));
      }
    }
    getData();
  }, []);

  return (
    <>
      {players.map((player) => (
        <option key={player.id + "_" + player.name} value={player.id + "_" + player.name}>{player.name}</option>
      ))}
    </>
  );
}
