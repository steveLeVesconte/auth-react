import BoardRow from "../game-board/board-row/board-row";

interface Props {
  boardString: string;
}

const GameBoard = (props: Props) => {
  return <>{createRows(props.boardString)}</>;
};

const createRows = (boardString: string): JSX.Element[] => {
  const content: JSX.Element[] = [];
  const rowStringsArray: string[] = boardString.split(",");
  for (let rowNum = 0; rowNum < 19; rowNum++) {
    content.push(
      <BoardRow key={rowNum} row={rowNum} content={rowStringsArray[rowNum]} />
    );
  }
  return content;
};

export default GameBoard;
