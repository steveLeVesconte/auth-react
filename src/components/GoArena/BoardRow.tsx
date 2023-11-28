import { HStack } from '@chakra-ui/react'
import Intersection from './Intersection';

interface Props {
  row: number;
  content: string;
  isMyTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
}

const BoardRow = (props: Props) => {
  const content = [];
  const stringArray = props.content.split("");
/*   if(props.expressRowAndColumnLables){

      content.push(<div className='rowNumberLabel'>{props.row.toString()}</div>);
  } */

  for (let x = 0; x < 19; x++) {
    const thisKey = props.row.toString() + '-' + x.toString();
    
    content.push(<Intersection key={thisKey} row={props.row} col={x} content={stringArray[x]} isMyTurn={props.isMyTurn} onSelectIntersection={props.onSelectIntersection} />);
  }
  return (
    <HStack gap={0}>{content}</HStack>
  )
}

export default BoardRow