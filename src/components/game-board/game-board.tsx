import BoardRow from "../game-board/board-row/board-row";

interface Props {
  boardString: string;
 // isMyTurn: boolean;
 // onSelectIntersection: (row: number, col: number) => void;
}

const GameBoard = (props: Props) => {
  return (
    <>
      {createRows(
        props.boardString,
       // props.onSelectIntersection,
       // props.isMyTurn
      )}
    </>
  );
};

const createRows = (
  boardString: string,
  //onSelectIntersection: (row: number, col: number) => void,
 //isMyTurn: boolean
): JSX.Element[] => {
  const content: JSX.Element[] = [];
  const rowStringsArray: string[] = boardString.split(",");
  for (let rowNum = 0; rowNum < 19; rowNum++) {
    content.push(
      <BoardRow
        key={rowNum}
        row={rowNum}
        content={rowStringsArray[rowNum]}
      //  isMyTurn={isMyTurn}
      //  onSelectIntersection={onSelectIntersection}
      />
    );
  }
  return content;
};

export default GameBoard;
