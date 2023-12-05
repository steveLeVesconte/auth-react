import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

import LetterRow from './LetterRow';
import GameBoard from './GameBoard';
import { ActionState } from '../../firestore';

interface Props {
    boardString: string;
    isMyTurn: boolean;
    onSelectIntersection: (row: number, col: number) => void;
    expressRowAndColumnLabels: boolean;
    actionState:ActionState;
}

const GoGameBoard = (props: Props) => {


    return (<>
        <div className='gameGridContainer'>
            <Grid templateAreas={`"corner headerLetters" 
                              "rowNums gameBoard"`}
                gridTemplateColumns={'3fr 97fr'}
                gridTemplateRows={'3fr 97fr'}
                w="100%"
                h="100%"
                className='boarderContainer'>
                <GridItem area={"corner"} ><div> </div></GridItem>
                <GridItem area={"headerLetters"} >
                    {props.expressRowAndColumnLabels && <LetterRow ></LetterRow>}

                </GridItem>
                <GridItem area={"rowNums"} >
                    <Flex h={"100%"} flexDirection={"column"} pt="7px" paddingBottom="8px" >
                        {createRowsNumbers()}
                    </Flex>
                </GridItem>
                <GridItem bg='pink.200' area={"gameBoard"} >
                    <div className='gameBoard'>
                        {<GameBoard boardString={props.boardString} isMyTurn={props.isMyTurn} onSelectIntersection={props.onSelectIntersection} actionState={props.actionState}/>}
                    </div>
                </GridItem>
            </Grid>
        </div>

    </>
    );
}


const createRowsNumbers = (): JSX.Element[] => {
    const content: JSX.Element[] = [];


    for (let x = 18; x >= 0; x--) {
        content.push(<Box flexDir={"row"} flexShrink={1} flexGrow={1} display={"flex"} alignItems={"center"} key={x} ><div className='rowNumberLabel' >{x}</div></Box>);
    }
    return content;
}
export default GoGameBoard


