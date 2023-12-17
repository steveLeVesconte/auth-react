import { Box, Grid, GridItem } from "@chakra-ui/react";
import styles from "./game-board-w-labels.module.css";
import GameBoard from "../game-board/game-board";
import LetterRow from "../GoArena/LetterRow";

interface Props {
  boardString: string;
  isMyTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
}

const GoGameBoard = (props: Props) => {
  return (
    <>
      <div>
        <Grid
          templateAreas={`"corner headerLetters" 
                              "rowNums gameBoard"`}
          gridTemplateColumns={"3fr 97fr"}
          gridTemplateRows={"3fr 97fr"}
          className={styles.boarderContainer}
        >
          <GridItem area={"corner"}>
            <div> </div>
          </GridItem>
          <GridItem area={"headerLetters"}>
            <LetterRow></LetterRow>
          </GridItem>
          <GridItem area={"rowNums"} className="row-nums">
            {createRowsNumbers()}
          </GridItem>
          <GridItem area={"gameBoard"}>
            <div>
              {
                <GameBoard
                  boardString={props.boardString}
                  isMyTurn={props.isMyTurn}
                  onSelectIntersection={props.onSelectIntersection}
                />
              }
            </div>
          </GridItem>
        </Grid>
      </div>
    </>
  );
};

const createRowsNumbers = (): JSX.Element[] => {
  const content: JSX.Element[] = [];
  for (let x = 18; x >= 0; x--) {
    content.push(
      <Box className="rowNumberLabel" key={x}>
        <div className="row-number">{x}</div>
      </Box>
    );
  }
  return content;
};
export default GoGameBoard;
