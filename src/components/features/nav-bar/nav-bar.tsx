import {
  HStack,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button,
  Icon,

  Box,
  DarkMode,
} from "@chakra-ui/react";
import ColorModeSwitch from "./color-mode-switch";
import { PlayerContext, PlayerContextType } from "../../../contexts/PlayerContext";
import { useContext, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { TbGoGame } from "react-icons/tb";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  //const color = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();
  const { player } = useContext(PlayerContext) as PlayerContextType;

  async function handleLogout() {
    console.log("currentUser: ", currentUser);
    console.log("error: ", error);
    setError("");
    try {
      await logout();
      navigate("/auth/login");
    } catch {
      setError("failed to log out");
    }
  }

  return (  
    <Box bg="black" className="nav-bar" p={2} w="100%">
      <HStack justifyContent={"space-between"} width="100%">
        <Icon
          onClick={() => {
            navigate("/");
          }}
          as={TbGoGame}
          className="goIcon"
          borderRadius={10}
          w={8}
          h={8}
          color="black"
        />
        <HStack>
          <ColorModeSwitch></ColorModeSwitch>
          <Menu>
          <DarkMode>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {player?.name}
            </MenuButton>
            </DarkMode>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/update-profile");
                }}
              >
                Change Password
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Box>
 
  );
};

export default NavBar;
