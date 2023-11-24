import whiteStone from '../../assets/WhiteStone.png';
import blackStone from '../../assets/BlackStoneTrans.png';

interface Props {//  TBD IS THIS USED????
    content:string;
  }

import {  Image } from '@chakra-ui/react';
const GoStone = (props:Props) => {
    if(props.content==="w")
  return (
    <Image   style={{position: 'absolute', left: '0',  top: '0',  padding: '.5rem',  margin: '0'}}
   src={whiteStone}></Image>
  );

  if(props.content==="b")
  return (
    <Image  style={{position: 'absolute', left: '0',  top: '0',  padding: '.5rem',  margin: '0'}}
   src={blackStone}></Image>
  )
}

export default GoStone