

import Signup from "../pages/Signup";
import {AuthProvider} from "../contexts/AuthContext"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoute";
import ForgotPassword from "../pages/ForgotPassword";
import UpdateProfile from "../pages/UpdateProfile";
import PlayerProfile from "../pages/PlayerProfile";
import PlayerContextProvider from "../contexts/PlayerContext";
import CreateMatch from "../pages/CreateMatch";
import GoArena from "./GoArena/GoArena";
import MatchList from "./MatchList";
import { Container } from "@chakra-ui/react";
import MainLayout from "../layouts/MainLayout";
import GameBoardLayout from "../layouts/GameBoardLayout";
import AuthLayout from "../layouts/AuthLayout";

function App() {
  return (<>
{/*   <Container maxW={{ lg: "100%", xl: "1280px" }} > */}
{/*   <Container > */}

    <Router>
    <AuthProvider>
      <PlayerContextProvider>
      <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<MainLayout  />} path="/"  >
            <Route element={<Dashboard />} index />
            <Route element={<UpdateProfile />} path="update-profile" />
            <Route element={<PlayerProfile />} path="player-profile" />
            <Route element={<CreateMatch />} path="create-match" />
            <Route element={<MatchList />} path="match-list" />
        </Route>
        <Route element={<GameBoardLayout  />} path="/go-board"  >
       
            <Route element={<GoArena />} index />
        </Route>

       </Route>


{/*       <Route element={<Dashboard />} path="/" /> */}
<Route element={<AuthLayout  />} path="/auth"  >
      <Route path="signup"  element={<Signup />} />
      <Route path="login"  element={<Login />} />
      <Route path="forgot-password"  element={<ForgotPassword />} />
      </Route>

    </Routes>
    </PlayerContextProvider>
    </AuthProvider>
    </Router>
    <div className='w-100 text-center mt-2'>
                        ver 1.0.0
                    </div>

{/* </Container> */}
</> )

}

export default App
