import styles from "./intersection-background.module.css";
import blackStone from "../../../../assets/blackStoneTrans.png";
import whiteStone from "../../../../assets/whiteStoneTrans.png";
import { Image } from "@chakra-ui/react";
import { UpperRightSVG } from "./svg/index";
import { IntersectionSVG } from "./svg/index";
import { PendingPlaySVG } from "./svg/index";
import { TopRowSVG } from "./svg/index";
import { LowerLeftSVG } from "./svg/index";
import { LowerRightSVG } from "./svg/index";
import { BottomRowSVG } from "./svg/index";
import { LeftEdgeSVG } from "./svg/index";
import { RightEdgeSVG } from "./svg/index";
import { IntersectionDotSVG } from "./svg/index";
import { UpperLeftSVG } from "./svg/index";
import {
  ACTION_STONE_PLAY,
  STONE_BLACK,
  STONE_WHITE,
} from "../../../../constants";
import { LastTurnNumberLabel } from "./last-turn-number-label";
import { useGameStateStore } from "../../../../stores/game-state-store";
//import { useGameArenaContext } from "../../../../contexts/game-arena-context";

interface Props {
  row: number;
  col: number;
  content: string;
}

const IntersectionBackGround = (props: Props) => {

  const isPlayerTurn=useGameStateStore(state=>state.isPlayerTurn);
  const turnNumber=useGameStateStore(state=>state.turnNumber);
  // const updateTurnNumber=useGameStateStore(state=>state.updateTurnNumber);
  // const updateIsPlyerTurn=useGameStateStore(state=>state.updateIsPlayerTurn);
  // const onCancelAction=useGameStateStore(state=>state.onCancelAction);
  // const updateOnCancelAction=useGameStateStore(state=>state.updateOnCancelAction);
  // const onConfirmAction=useGameStateStore(state=>state.onConfirmAction);
  // const updateOnConfirmAction=useGameStateStore(state=>state.updateOnConfirmAction);
  const pendingAction = useGameStateStore(state=>state.pendingAction);
  const updatPendingAction = useGameStateStore(state=>state.updatePendingAction);
  const lastAction=useGameStateStore(state=>state.lastAction);
  //const updatLastAction = useGameStateStore(state=>state.updateLastAction);



 // const { gameActionState, turnState, boardState } = useGameArenaContext();
 // const lastTurnNumber = turnState?.turnNumber;

  function isPendingActionHere(row: number, col: number): boolean {
    // console.log('isPendingActionHere');
    // console.log('isPendingActionHere isplayerturn: ', isPlayerTurn);
    // console.log('isPendingActionHere pendingAction: ', pendingAction);
    // console.log('isPendingActionHere location: ',pendingAction?.location);
    if (!isPlayerTurn) return false;
    // console.log('isPendingActionHere 1');
    if (!pendingAction ) return false;
    // console.log('isPendingActionHere 2');
    if (pendingAction .actionType !== ACTION_STONE_PLAY)
      return false;
      // console.log('isPendingActionHere 3');
    if (pendingAction?.location?.row !== row) return false;
    // console.log('isPendingActionHere 4');
    if (pendingAction?.location?.col !== col) return false;
    // console.log('isPendingActionHere 5');
    return true;
  }

  function isLastPlayHere(row: number, col: number): boolean {
    if (!lastAction) return false;
    if (lastAction?.actionType!== ACTION_STONE_PLAY) return false;
    if (lastAction?.location?.row !== row) return false;
    if (lastAction?.location?.col !== col) return false;
    return true;
  }

  let stoneImage = blackStone;
  if (props.content == STONE_WHITE) stoneImage = whiteStone;
  // occupied cell
  if (props.content == STONE_BLACK || props.content == STONE_WHITE) {
    const lastPlayIconColor = props.content == STONE_BLACK ? "white" : "black";
    return (
      <div className={styles.boardIntersectionWithStone}>
        {intersectionBackground(props.row, props.col)}
        <Image m="5%" className={styles.stone} src={stoneImage} />
        {isLastPlayHere(props.row, props.col) && (
          <LastTurnNumberLabel
            stoneColor={lastPlayIconColor}
            lastTurnNumber={turnNumber ?? 0}
          ></LastTurnNumberLabel>
        )}
      </div>
    );
  }
  //NOT  my turn and empty cell
  if (!isPlayerTurn) {
    return intersectionBackground(props.row, props.col);
  } else {
    // my turn and empty cell
    return (
      <div
        onClick={() =>{
          console.log('my turn and empty cell');
          updatPendingAction(  {
            actionType: ACTION_STONE_PLAY,
            location: { row: props.row, col: props.col },
          });
        }
        }
        className={` ${styles.intersectionHover} ${styles.emptyIntersection}`}
      >
        {intersectionBackground(props.row, props.col)}
        {isPendingActionHere(props.row, props.col) && (
          <PendingPlaySVG stoneColor="#000000" />
        )}
      </div>
    );
  }
};

function intersectionBackground(row: number, col: number): JSX.Element {
  if (row == 0 && col == 0) return <UpperLeftSVG />;
  if (row == 0 && col > 0 && col < 18) return <TopRowSVG />;
  if (row == 0 && col == 18) return <UpperRightSVG />;
  if (row == 18 && col == 0) return <LowerLeftSVG />;
  if (row == 18 && col > 0 && col < 18) return <BottomRowSVG />;
  if (row == 18 && col == 18) return <LowerRightSVG />;
  if (row > 0 && row < 18 && col == 0) return <LeftEdgeSVG />;
  if (row > 0 && row < 18 && col == 18) return <RightEdgeSVG />;
  if (row == 3 && col == 3) return <IntersectionDotSVG />;
  if (row == 3 && col == 15) return <IntersectionDotSVG />;
  if (row == 15 && col == 15) return <IntersectionDotSVG />;
  if (row == 15 && col == 3) return <IntersectionDotSVG />;
  if (row == 3 && col == 9) return <IntersectionDotSVG />;
  if (row == 9 && col == 3) return <IntersectionDotSVG />;
  if (row == 9 && col == 15) return <IntersectionDotSVG />;
  if (row == 9 && col == 9) return <IntersectionDotSVG />;
  if (row == 15 && col == 9) return <IntersectionDotSVG />;
  return <IntersectionSVG />;
}

export default IntersectionBackGround;
