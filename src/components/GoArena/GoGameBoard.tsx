import { Center, HStack, VStack } from '@chakra-ui/react';
import BoardRow from './BoardRow';
import LetterRow from './LetterRow';

interface Props {
    boardString: string;
    isMyTurn: boolean;
    onSelectIntersection: (row: number, col: number) => void;
    expressRowAndColumnLabels: boolean;
}

const GoGameBoard = (props: Props) => {

    //let containerClass = "";
    //if (props.expressLetters) containerClass = "boardContainer";
    console.log("go game board: ", props)
    return (<>
        <div >
     {/*        {props.expressRowAndColumnLabels && <div className="letter-row-container"> <LetterRow ></LetterRow></div>}
     */}     {/*    <div id="h" style={{ height: "100%", display: "flex"}}> */}
              {/*   <div style={{ flexGrow:"1", height: "auto", width:"30px"}}>
                    <div id="moo" style={{ width:"30px",height: "100%", display: "flex", flexDirection: "column", alignItems: "strech" }}>

                    <div className="rowNumberDiv">00</div>
                    <div className="rowNumberDiv">01</div>
                        <div className="rowNumberDiv">02</div>
                        <div className="rowNumberDiv">03</div>
                        <div className="rowNumberDiv">04</div>
                        <div className="rowNumberDiv">05</div>
                        <div className="rowNumberDiv">06</div>
                        <div className="rowNumberDiv">07</div>
                        <div className="rowNumberDiv">08</div>
                        <div className="rowNumberDiv">09</div>
                        <div className="rowNumberDiv">10</div>
                        <div className="rowNumberDiv">11</div>
                        <div className="rowNumberDiv">12</div>
                        <div className="rowNumberDiv">13</div>
                        <div className="rowNumberDiv">14</div>
                        <div className="rowNumberDiv">15</div>
                        <div className="rowNumberDiv">16</div>
                        <div className="rowNumberDiv">17</div>
                        <div className="rowNumberDiv">18</div>
                    </div>

                </div> */}
              {/*   <div className={containerClass}> */}
                <div className='gameBoard'>
                {props.expressRowAndColumnLabels &&  <LetterRow ></LetterRow>}
   
                    {createRows(props.boardString, props.onSelectIntersection, props.isMyTurn, props.expressRowAndColumnLabels)}
                </div>
                {/* </div> */}
          {/*   </div> */}
        </div>
    </>
    );
}

const createRows = (boardString: string, onSelectIntersection: (row: number, col: number) => void, isMyTurn: boolean, expressRowAndColumnLabels:boolean): JSX.Element[] => {
    console.log('*************************** board string in create rows: ', boardString);
    const content: JSX.Element[] = [];
    const rowStringsArray: string[] = boardString.split(',');
    if (rowStringsArray.length == 19)
        console.log(' rowStringsArray in create rows: ', rowStringsArray);

    for (let x = 0; x < 19; x++) {
        content.push(<BoardRow key={x} row={x} content={rowStringsArray[x]} isMyTurn={isMyTurn} onSelectIntersection={onSelectIntersection} expressRowAndColumnLables={expressRowAndColumnLabels} />);
    }
    return content;
}
export default GoGameBoard


