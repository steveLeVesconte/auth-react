import { HStack } from '@chakra-ui/react'
//import Intersection from './Intersection';

/* interface Props {
  row: number;
  content: string;
  isMyTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
} */

const LetterRow = () => {
  const content = [];
  //const stringArray = props.content.split("");
  for (let x = 0; x < 19; x++) {
    //const thisKey = props.row.toString() + '-' + x.toString();
    content.push(<div style={{width:"7%", textAlign:"center"}}>{x}</div>);
  }
  return (
    <HStack gap={0} style={{width:"100%"}}>{content}</HStack>
  )
}

export default LetterRow