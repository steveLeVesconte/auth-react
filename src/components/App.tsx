// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

//import { Container } from "react-bootstrap"
import Signup from "./Signup";
import {AuthProvider} from "../contexts/AuthContext"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login";
import { Container } from "react-bootstrap";
import PrivateRoutes from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
    <div className="w-100" style={{ maxWidth: "400px" }}>
    <Router>
    <AuthProvider>
      <Routes>
      <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" />
            <Route element={<UpdateProfile />} path="/update-profile" />
{/*             <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="projects" element={<Projects />} /> */}
          </Route>


{/*       <Route element={<Dashboard />} path="/" /> */}
      <Route path="/signup"  element={<Signup />} />
      <Route path="/login"  element={<Login />} />
      <Route path="/forgot-password"  element={<ForgotPassword />} />
{/*     <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}} >

<div className="w-100" style={{maxWidth:"400px"}}>
<Signup/>
</div>
        
    </Container> */}
    </Routes>
    </AuthProvider>
    </Router>
    <div className='w-100 text-center mt-2'>
                        ver 1.0.0
                    </div>
    </div>

    </Container>
  )
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
