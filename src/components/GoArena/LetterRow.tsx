import { Box, Flex } from '@chakra-ui/react'
//import Intersection from './Intersection';

/* interface Props {
  row: number;
  content: string;
  isMyTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
} */

const LetterRow = () => {
  const content = [];
  const letters="ABCDEFGHIJKLMNOPQRS";
  //const stringArray = props.content.split("");
 /*  content.push(<div className='cornerSpacer'></div>); */
  for (let x = 0; x < 19; x++) {
    //const thisKey = props.row.toString() + '-' + x.toString();
    
    content.push(<div  className='colLetterLabel'>{letters[x]}</div>);
  }
  return (
   <Box pl="5px" paddingRight="5px"> <Flex gap={0} >{content}</Flex></Box>
  )
}

export default LetterRow