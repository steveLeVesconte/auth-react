import { HStack } from '@chakra-ui/react'
import Intersection from './Intersection';


interface Props {

    row:number;

    content:string;

    onSelectIntersection: (row:number, col:number) => void;
    // 👇️ turn off type checking
   // playerId: (params: string) => void;
  }

const BoardRow = (props:Props) => {
    const content = [];
    console.log('zzzzzzzzzzzz props content: ', props.content);
    const stringArray=props.content.split("");

    for(let x=0; x<19; x++) {
      //let tcont='-';
    //   if(props.row==13 && x==13) tcont='b';
    //   if(props.row==14 && x==14) tcont='w';
     const thisKey=props.row.toString()+'-'+x.toString();
    console.log('col item:  xxxxxx  ',x, stringArray[x])
      content.push(<Intersection key={thisKey} row={props.row} col={x} content={stringArray[x]} onSelectIntersection={props.onSelectIntersection}/>);
    }
  return (
    <HStack gap={0}>{content}</HStack>
  )
}

export default BoardRow