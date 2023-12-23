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
import { useGameArenaContext } from "../../../../contexts/game-arena-context";

interface Props {
  row: number;
  col: number;
  content: string;
}

const IntersectionBackGround = (props: Props) => {
  const { gameActionState, turnState, boardState } = useGameArenaContext();
  const lastTurnNumber = turnState?.turnNumber;

  function isPendingActionHere(row: number, col: number): boolean {
    if (!boardState?.isPlayersTurn) return false;

    if (!gameActionState?.pendingAction) return false;

    if (gameActionState?.pendingAction.actionType !== ACTION_STONE_PLAY)
      return false;

    if (gameActionState?.pendingAction?.location?.row !== row) return false;

    if (gameActionState?.pendingAction?.location?.col !== col) return false;

    return true;
  }

  function isLastPlayHere(row: number, col: number): boolean {
    if (!turnState?.lastAction) return false;
    if (turnState?.lastAction.actionType !== ACTION_STONE_PLAY) return false;
    if (turnState?.lastAction?.location?.row !== row) return false;
    if (turnState?.lastAction?.location?.col !== col) return false;
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
            lastTurnNumber={lastTurnNumber ?? 0}
          ></LastTurnNumberLabel>
        )}
      </div>
    );
  }
  //NOT  my turn and empty cell
  if (!boardState?.isPlayersTurn) {
    return intersectionBackground(props.row, props.col);
  } else {
    // my turn and empty cell
    return (
      <div
        onClick={() =>
          gameActionState?.onGameAction({
            actionType: ACTION_STONE_PLAY,
            location: { row: props.row, col: props.col },
          })
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
