import {
  Image,
    Card,
    CardBody,
    useColorModeValue,Text, Box, HStack, Flex
  } from '@chakra-ui/react';
  import blackStoneImage from "../../assets/blackStoneTrans.png";
  import whiteStoneImage from "../../assets/whiteStoneTrans.png";

import { Message } from '../../firestore';
  
  interface Props {
    message:Message;
    stoneColor:string;
  }
  
  const MessageCard = ( props : Props) => {
    const nameColor = useColorModeValue('orange.600', 'orange.100')
   console.log('message: ',props.message);

    return (
      <Flex minH="20px" mb="15px" flexDirection="row" className='message-card'>
{/*         <CardHeader>
            <h3>{props.message.speakerName} {props.message.createDate.substring(0,10)}</h3>
        </CardHeader> */}
      {/*   <CardBody className='message-card-body'> */}
          <Box className='message-stone-div' flexShrink={0} width="35px" >
          {(props.stoneColor=="w")&&<Image   className='message-stone' src={whiteStoneImage} />}
    {(props.stoneColor=="b")&&<Image  className='message-stone' src={blackStoneImage} />}
         
          </Box>
       <Box className='message-unit' paddingRight={4} > 
   {/*     <span className='message-date'>{(props.message.createDate.length>39)?? props.message.createDate.substring(0,10)}</span>
       <span className='message-time'>{(props.message.createDate.length>1)?? "x" + props.message.createDate.substring(11,6)}</span>
 */}       
      <span className='message-date'>{(props.message.createDate.length>9)&& props.message.createDate.substring(0,10)}</span> 
       <span className='message-time'>{(props.message.createDate.length>10)&& " [ " +  props.message.createDate.substring(11,16) +" ] " }</span>
     <Text as="span" color={nameColor} >{ props.message.speakerName}: </Text>
       <span className="message-text">
    {props.message.message}</span></Box> 
     {/*    </CardBody> */}
      </Flex>
    );
  };
  
  export default MessageCard;