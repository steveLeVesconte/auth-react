import {
  HStack,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button,
  Box,
  CardBody,
  Card,
} from "@chakra-ui/react";
import { PlayerContext, PlayerContextType } from "../../contexts/PlayerContext";
import { useContext, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
  const { player } = useContext(PlayerContext) as PlayerContextType;
  return (
    <Box className="cardBox">
      <Card>
        <CardBody>
          <HStack justifyContent="end">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {player?.name}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </MenuItem>
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
        </CardBody>
      </Card>
    </Box>
  );
};

export default NavBar;
