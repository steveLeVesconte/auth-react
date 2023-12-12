
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoute";
import ForgotPassword from "../pages/ForgotPassword";
import UpdateProfile from "../pages/UpdateProfile";
import PlayerProfile from "../pages/PlayerProfile";
import PlayerContextProvider from "../contexts/PlayerContext";
import CreateMatch from "../pages/CreateMatch";
import GoArena from "./GoArena/GoArena";
import MatchList from "./MatchList";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import GameLayout from "../layouts/GameLayout";
import SignUp from "../pages/Signup";

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
                  <Route element={<GoArena />} index />
                </Route>
              </Route>
              <Route element={<AuthLayout />} path="/auth">
                <Route path="signup" element={<SignUp />} />
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
