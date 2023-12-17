import { HStack } from "@chakra-ui/react";
import Intersection from "../intersection/intersection";

interface Props {
  row: number;
  content: string;
  isMyTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
}

const BoardRow = (props: Props) => {
  const content = [];
  const stringArray = props.content.split("");
  for (let colNum = 0; colNum < 19; colNum++) {
    const thisKey = props.row.toString() + "-" + colNum.toString();
    content.push(
      <Intersection
        key={thisKey}
        row={props.row}
        col={colNum}
        content={stringArray[colNum]}
        isMyTurn={props.isMyTurn}
        onSelectIntersection={props.onSelectIntersection}
      />
    );
  }
  return <HStack gap={0}>{content}</HStack>;
};

export default BoardRow;
