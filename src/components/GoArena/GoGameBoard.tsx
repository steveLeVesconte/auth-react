import { Box, Center, Flex, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import BoardRow from './BoardRow';
import LetterRow from './LetterRow';
import GameBoard from './GameBoard';

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
        <div className='gameGridContainer'>
            <Grid templateAreas={`"corner headerLetters" 
                              "rowNums gameBoard"`} 
                gridTemplateColumns={'3fr 97fr'}
                gridTemplateRows={'3fr 97fr'}
                w="100%"
                h="100%"
                className='boarderContainer'>
                <GridItem  area={"corner"} ><div> </div></GridItem>
                <GridItem  area={"headerLetters"} >
                {props.expressRowAndColumnLabels && <LetterRow ></LetterRow>}

                </GridItem>
                <GridItem  area={"rowNums"} >
                <Flex h={"100%"} flexDirection={"column"} >
                    {createRowsNumbers() }
                    </Flex>
                </GridItem>
                <GridItem bg='pink.200' area={"gameBoard"} >
                    <div className='gameBoard'>
                    {<GameBoard boardString={props.boardString} isMyTurn={props.isMyTurn} onSelectIntersection={props.onSelectIntersection} />}

                        {/* {props.expressRowAndColumnLabels && <LetterRow ></LetterRow>} */}
                    
                      {/*   {createRows(props.boardString, props.onSelectIntersection, props.isMyTurn, props.expressRowAndColumnLabels)} */}
                    </div>
                </GridItem>
            </Grid>
        </div>
{/*         <div className='gameGridContainer'>
            <div className='gameBoard'>

                {createRows(props.boardString, props.onSelectIntersection, props.isMyTurn, props.expressRowAndColumnLabels)}
            </div>

        </div> */}
    </>
    );
}

const createRows = (boardString: string, onSelectIntersection: (row: number, col: number) => void, isMyTurn: boolean, expressRowAndColumnLabels: boolean): JSX.Element[] => {
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
const createRowsNumbers = (): JSX.Element[] => {
    const content: JSX.Element[] = [];

    
    for (let x = 18; x >=0 ; x--) {
        content.push(<Box flexDir={"row"}  flexShrink={1} flexGrow={1} display={"flex"}  alignItems={"center"} key={x} ><div className='rowNumberLabel' >{x}</div></Box>);
    }
    return content;
}
export default GoGameBoard


