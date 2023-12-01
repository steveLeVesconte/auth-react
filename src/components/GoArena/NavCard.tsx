import { HStack, Menu, MenuList, MenuButton, MenuItem, Button, Box, CardBody, Card} from '@chakra-ui/react'
//import logo from "../assets/logo.webp";
//import ColorModeSwitch from './ColorModeSwitch';
import {PlayerContext} from '../../contexts/PlayerContext'
import { useContext, useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons'
//import { Player } from '../firestore';
import { useAuth } from '../../contexts/AuthContext';
import {  useNavigate } from 'react-router-dom';
//import logo from '../assets/logo.png'
//import { TbGoGame } from "react-icons/tb";

const NavBar = () => {
   const {currentUser, logout}=useAuth();
   const [error, setError]=useState("");
//    const bg = useColorModeValue('red.500', 'red.200')
//    const color = useColorModeValue('white', 'gray.800')
    const navigate = useNavigate()
    async function handleLogout(){
      console.log('currentUser: ',currentUser);
      console.log('error: ',error);
        setError('');
        try{
          await logout();
          navigate("/auth/login");
        }catch{
          setError('failed to log out')
        }
      }
    const player=useContext(PlayerContext)
  return (
    <Box className='cardBox'>
    <Card>
<CardBody>
 {/*   <HStack  justifyContent={'space-between'} maxW={{ xl: "100%", "2xl": "1280px" }}> */}
  {/*   <Icon  onClick={()=>{navigate("/")}} as={TbGoGame} className="goIcon"  w={8} h={8}   bg={bg} color={color} /> */}
{/*    <TbGoGame onClick={()=>{navigate("/")}}  className="goIcon"/>
    <Image onClick={()=>{navigate("/")}} src={logo} boxSize='60px'></Image> */}
    <HStack justifyContent="end">
       
    {/* <ColorModeSwitch></ColorModeSwitch> */}
    <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
  {player?.name} 
  </MenuButton>
  <MenuList>
  <MenuItem   onClick={()=>{navigate("/")}}>Home</MenuItem>
  
    <MenuItem   onClick={handleLogout}>Logout</MenuItem>
    <MenuItem  onClick={()=>{navigate("/update-profile")}}>Change Password</MenuItem>

  </MenuList>
</Menu>
    </HStack>
{/*    </HStack> */}
   </CardBody>
    </Card>
    </Box>
  )
}

export default NavBar