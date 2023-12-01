import {Text, Box, Card, CardBody, Heading, VStack ,Image, Button} from '@chakra-ui/react'
import blackStoneImage from "../../assets/blackStoneTrans.png";
import whiteStoneImage from "../../assets/whiteStoneTrans.png";



interface Props {
    stoneColor:string;
    prisoners: number;
    playerName: string;
    oppoenentName: string;
    isMyTurn: boolean;
    isPlayer: boolean;
    onPass: () => void;
}

export const PlayerCard = (props:Props) => {
    // let myStoneImage="";
    // let opStoneImage="";

    // if(props.stoneColor=="w") {
    //     myStoneImage=whiteStoneImage;
    //     opStoneImage=blackStoneImage;
    // }
    // if(props.stoneColor=="b") {
    //     myStoneImage=whiteStoneImage;
    //     opStoneImage=blackStoneImage;
    // }
  return ( 
    
    
    
    
    
    <Box h="100%" className='cardBox'>
    <Card h="100%">
<CardBody >
<VStack>
    {props.isPlayer&&<><Heading>You</Heading> <Heading>{props.playerName}</Heading></>}
    {(!props.isPlayer)&&<><Heading>Opponent</Heading> <Heading>{props.playerName}</Heading></>}

    {(props.stoneColor=="w")&&<Image width="80%" m="5%" className='player-stone' src={whiteStoneImage} />}
    {(props.stoneColor=="b")&&<Image width="80%" m="5%" className='player-stone' src={blackStoneImage} />}
    
     <Text>Prisoners taken: {props.prisoners}</Text>
     {(props.isPlayer && props.isMyTurn) &&<Heading>My Turn!</Heading>}
     {(props.isPlayer && (!props.isMyTurn)) &&<Text>Waiting for {props.oppoenentName} to play.</Text>}
     {(props.isPlayer && (props.isMyTurn)) && <Button onClick={() => props.onPass()}>Pass</Button>}
        
{/*      <div>color {props.stoneColor}</div> */}
    </VStack>
{/* <div>PlayerCard</div>
<div>color {props.stoneColor}</div>
<div>{props.playerName}</div>
<div>{props.prisoners}</div>
<div>{props.isPlayer}</div>
<div> is my turn: {props.isMyTurn?"yes":"no"}</div> */}
    </CardBody>
    </Card>
    </Box>
  )
}
