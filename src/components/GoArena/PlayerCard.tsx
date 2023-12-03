import {Text,  Card, CardBody,  VStack ,Image,  HStack} from '@chakra-ui/react'
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

  return ( 
    
    
    
    
    
   
    <Card h="100%">
<CardBody p="5px" >
<VStack alignItems="left" gap={0}>
{/*     {props.isPlayer&&<><Heading>You</Heading> <Heading>{props.playerName}</Heading></>}
    {(!props.isPlayer)&&<><Heading>Opponent</Heading> <Heading>{props.playerName}</Heading></>} */}
<HStack alignItems="left">
    {(props.stoneColor=="w")&&<Image   className='player-stone' src={whiteStoneImage} />}
    {(props.stoneColor=="b")&&<Image  className='player-stone' src={blackStoneImage} />}
    {(props.isPlayer && props.isMyTurn) &&<span>My Turn!</span>}
     {(props.isPlayer && (!props.isMyTurn)) &&<span>Waiting.</span>}

   
    </HStack >
    <Text> {props.playerName}</Text>    
    <Text>Caputered: {props.prisoners}</Text>
    {/*  <Text style={{fontSize:"16px"}}>Prisoners taken: {props.prisoners}</Text>
    */}
{/*      {(props.isPlayer && props.isMyTurn) &&<span>My Turn!</span>}
     {(props.isPlayer && (!props.isMyTurn)) &&<span>Waiting for {props.oppoenentName} to play.</span>}
     {(props.isPlayer && (props.isMyTurn)) && <Button onClick={() => props.onPass()}>Pass</Button>} */}
        
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
   
  )
}
