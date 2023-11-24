//import { useContext, useState } from 'react'
//import { Alert, Button, Card} from 'react-bootstrap'
//import {useAuth} from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
//import PlayerList from '../components/PlayerList';
//import { PlayerContext } from '../contexts/PlayerContext';
import {  Button,  Heading } from '@chakra-ui/react';
import MatchList from '../components/MatchList';


const Dashboard = () => {
  //const { logout}=useAuth();
/*   const player=useContext(PlayerContext)
const [error, setError]=useState(""); */
const navigate = useNavigate()
/*   async function handleLogout(){
  setError('');
  try{
    await logout();
    navigate("/auth/login");
  }catch{
    setError('failed to log out')
  }
} */
  return (
    <>
        <Heading as="h1" marginY={5} fontSize="5xl">
      Games
    </Heading>
    <Button onClick={()=>navigate("/create-match")}>New Match</Button>
<MatchList></MatchList>
{/*      <Card>
<CardBody>
  {player&&<h1>{player.name}</h1>}
  <h2 className='text-center mb-4'>Profile</h2>
  {error && <Alert variant="danger">{error}</Alert>}
  <strong>Email: </strong> {currentUser?.email}
  <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
  </CardBody>
     </Card>
<div className='w-100 text-center mt-2'>
  <Button variant="link" onClick={handleLogout}>Log Out</Button>
</div> */}
{/* <PlayerList></PlayerList> */}
    </>
  )
}

export default Dashboard
