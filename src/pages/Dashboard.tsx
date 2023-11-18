import { useContext, useState } from 'react'
//import { Alert, Button, Card} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import PlayerList from '../components/PlayerList';
import { PlayerContext } from '../contexts/PlayerContext';
import { Alert, Button, Card, CardBody } from '@chakra-ui/react';


const Dashboard = () => {
  const {currentUser, logout}=useAuth();
  const player=useContext(PlayerContext)
const [error, setError]=useState("");
const navigate = useNavigate()
  async function handleLogout(){
  setError('');
  try{
    await logout();
    navigate("/auth/login");
  }catch{
    setError('failed to log out')
  }
}
  return (
    <>

     <Card>
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
</div>
<PlayerList></PlayerList>
    </>
  )
}

export default Dashboard
