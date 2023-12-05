import { ActionState } from '../../firestore';
import BoardRow from './BoardRow';

interface Props {
    boardString: string;
    isMyTurn: boolean;
    onSelectIntersection: (row: number, col: number) => void;
    actionState:ActionState;
}

const GameBoard = (props: Props) => {
    return (<>
                        {createRows(props.boardString, props.onSelectIntersection, props.isMyTurn, props.actionState)}
    </>
    );
}

const createRows = (boardString: string, onSelectIntersection: (row: number, col: number) => void, isMyTurn: boolean, actionsState:ActionState): JSX.Element[] => {
    const content: JSX.Element[] = [];
    const rowStringsArray: string[] = boardString.split(',');
/*     if (rowStringsArray.length == 19)
        console.log(' rowStringsArray in create rows: ', rowStringsArray); */

    for (let x = 0; x < 19; x++) {
        content.push(<BoardRow key={x} row={x} content={rowStringsArray[x]} isMyTurn={isMyTurn} onSelectIntersection={onSelectIntersection} actionsState={actionsState}  />);
    }
    return content;
}

export default GameBoard


