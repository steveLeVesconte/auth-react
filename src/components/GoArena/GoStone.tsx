
import whiteStone from '../../assets/WhiteStone.png';
import blackStone from '../../assets/BlackStoneTrans.png';

interface Props {


    content:string;
    // 👇️ turn off type checking
   // playerId: (params: string) => void;
  }

import {  Image } from '@chakra-ui/react';
const GoStone = (props:Props) => {
    if(props.content==="w")
  return (
   /*  <div style={{ position: 'relative', zIndex: '2', height:'100%', width:'100%'  }}> */
    <Image style={{position: 'absolute', left: '0',  top: '0',  padding: '.5rem',  margin: '0'}}
   src={whiteStone}></Image>
/*    </div> */
   
  );

  if(props.content==="b")
  return (
    <Image style={{position: 'absolute', left: '0',  top: '0',  padding: '.5rem',  margin: '0'}}
   src={blackStone}></Image>
/*     <div style={{ position: 'relative', zIndex: '2' }}>
    <Image  src={blackStone}></Image>
   </div>) */
  )
}

export default GoStone