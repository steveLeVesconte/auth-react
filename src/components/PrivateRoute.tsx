import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useContext } from "react";
import { PlayerContext, PlayerContextType } from "../contexts/PlayerContext";

export default function PrivateRoutes() {
  const { currentUser } = useAuth();
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const loc = useLocation();
  if (!currentUser) {
    return <Navigate to="/auth/login" />;
  }

  if (player || loc.pathname == "/player-profile") {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/player-profile" />;
  }
}
