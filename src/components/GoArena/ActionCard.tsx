import { Box, Button, Card, CardBody } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

//import utilities from '../../services/moveProcessor/UtilityFunctions'

export const ActionCard = () => {
    const navigate = useNavigate();
  return (
    <Box h="100%" p={2}>
    <Card h="100%">
<CardBody>
    <div>action Card</div>

          <Button onClick={() => { navigate("/") }}>Home</Button>

{/* {utilities.getIsMyTurn(turn, player) && <Button onClick={() => handlePass(turn, player?.id ?? "")}>Pass</Button>}
<div> {utilities.getStoneColorOfCurrentPlayer(player?.id ?? "", turn)}</div>
<div>{utilities.getIsMyTurn(turn, player) ? "myturn" : "notMyTurn"}</div>
<div>{(turn?.turnNumber ?? 0) + 1}</div></div>
 */}

    </CardBody>
    </Card>
    </Box>
  )
}
