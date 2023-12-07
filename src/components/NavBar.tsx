import { HStack, Menu, MenuList, MenuButton, MenuItem, Button, Icon, useColorModeValue, Box } from '@chakra-ui/react'
//import logo from "../assets/logo.webp";
import ColorModeSwitch from './ColorModeSwitch';
import {PlayerContext} from '../contexts/PlayerContext';
import { useContext, useEffect, useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons'
//import { Player } from '../firestore';
import { useAuth } from '../contexts/AuthContext';
import {  useNavigate } from 'react-router-dom';
//import logo from '../assets/logo.png'
import { TbGoGame } from "react-icons/tb";
import useScreenOrientation from '../hooks/GetScreenOrientation';

const NavBar = () => {
  const orientation:string=useScreenOrientation()
   const {currentUser, logout}=useAuth();
   const [error, setError]=useState("");
   //const bg = useColorModeValue('red.500', 'red.200')
   const color = useColorModeValue('white', 'gray.800')
    const navigate = useNavigate();
    const [windowSize, setWindowSize] = useState([
      window.innerWidth,
      window.innerHeight,
    ]);
  
    useEffect(() => {
      const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      };
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);


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
    <Box className="nav-bar" pt={2} pb={2} w="100%">
   <HStack  justifyContent={'space-between'} width="100%">
    <Icon  onClick={()=>{navigate("/")}} as={TbGoGame} className="goIcon" borderRadius={10} w={8} h={8}   bg="#eac77b" color={color} />
{/*    <TbGoGame onClick={()=>{navigate("/")}}  className="goIcon"/>
    <Image onClick={()=>{navigate("/")}} src={logo} boxSize='60px'></Image> */}
    <HStack>
       
    <ColorModeSwitch></ColorModeSwitch>
    <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
  {player?.name}
  </MenuButton>
  <MenuList>
{/*   <div>
      <h2>Width: {windowSize[0]}</h2>

      <h2>Height: {windowSize[1]}</h2>
    </div> */}
    <MenuItem   onClick={handleLogout}>Logout</MenuItem>
    <MenuItem  onClick={()=>{navigate("/update-profile")}}>Change Password</MenuItem>
    <MenuItem  >{windowSize[0]}</MenuItem>
    <MenuItem   >{windowSize[1]}</MenuItem>
    <MenuItem   >{orientation}</MenuItem>
    <MenuItem   ><div className="display-orientation"/></MenuItem>

  </MenuList>
</Menu>
    </HStack>
   </HStack>
   </Box>
  )
}

export default NavBar