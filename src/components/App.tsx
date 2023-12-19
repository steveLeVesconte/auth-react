
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard-page";
import Login from "../pages/login-page";
import PrivateRoutes from "./PrivateRoute";
import ForgotPassword from "../pages/forgot-password-page";
import UpdateProfile from "../pages/update-profile";
import PlayerProfile from "../pages/player-profile";
import PlayerContextProvider from "../contexts/PlayerContext";
import CreateMatch from "../pages/create-match-page";

import MatchList from "./features/match-list/match-list";
import MainLayout from "../layouts/main-layout";
import AuthLayout from "../layouts/auth-layout";
import GameLayout from "../layouts/game-layout";
import Signup from "../pages/signup-page";
import GameArena from "./features/game-arena/game-arena";


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <PlayerContextProvider>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<MainLayout />} path="/">
                  <Route element={<Dashboard />} index />
                  <Route element={<UpdateProfile />} path="update-profile" />
                  <Route element={<PlayerProfile />} path="player-profile" />
                  <Route element={<CreateMatch />} path="create-match" />
                  <Route element={<MatchList />} path="match-list" />
                </Route>
                <Route element={<GameLayout />} path="/go-board">
                  <Route element={<GameArena />} index />
                </Route>
              </Route>
              <Route element={<AuthLayout />} path="/auth">
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>
          </PlayerContextProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
