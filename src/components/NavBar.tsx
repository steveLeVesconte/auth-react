import {Text, HStack,Image, Menu, MenuList, MenuButton, MenuItem, Button } from '@chakra-ui/react'
//import logo from "../assets/logo.webp";
import ColorModeSwitch from './ColorModeSwitch';
import {PlayerContext} from '../contexts/PlayerContext';
import { useContext, useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Player } from '../firestore';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

const NavBar = () => {
    const {currentUser, logout}=useAuth();
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


    const player=useContext(PlayerContext)
  return (
   <HStack  justifyContent={'space-between'} maxW={{ xl: "100%", "2xl": "1280px" }}>
    <Image src={logo} boxSize='60px'></Image>
    <HStack>
       
{/*     <Text fontWeight="bold" >{player?.name}  </Text> */}
    <ColorModeSwitch></ColorModeSwitch>
    <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
  {player?.name} 
  </MenuButton>
  <MenuList>
    <MenuItem   onClick={handleLogout}>Logout</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
    </HStack>
   </HStack>
  )
}

export default NavBar