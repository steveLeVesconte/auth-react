// import blackStone from "../../assets/blackStoneTrans.png";
// import whiteStone from "../../assets/whiteStoneTrans.png";

import styles from "./intersection-background.module.css";
import blackStone from "../../../assets/blackStoneTrans.png";
 import whiteStone from "../../../assets/whiteStoneTrans.png";
import { Image } from "@chakra-ui/react";
import {UpperRightSVG} from "./svg/index"

import {IntersectionSVG} from "./svg/index";
import {PendingPlaySVG} from "./svg/index";
import { useContext } from "react";

import {LastTurnSVG} from "./svg/index";
import {TopRowSVG} from "./svg/index";
//import UpperRightSVG from "./UpperRightSVG";
import {LowerLeftSVG} from "./svg/index";
import {LowerRightSVG} from "./svg/index";
import {BottomRowSVG} from "./svg/index";
import {LeftEdgeSVG} from "./svg/index";
import {RightEdgeSVG} from "./svg/index";
import {IntersectionDotSVG} from "./svg/index";
import {UpperLeftSVG} from "./svg/index";
import { ContextPackage, StoneContext } from "../../GoArena/GoArena";

interface Props {
  row: number;
  col: number;
  content: string;
  isMyTurn: boolean;
  onSelectIntersection: (row: number, col: number) => void;
}

const IntersectionBackGround = (props: Props) => {
  const contextPackage = useContext(StoneContext);

  function isPendingActionHere(
    context: ContextPackage,
    row: number,
    col: number
  ): boolean {
    if (!context.isPlayersTurn) return false;
    if (!context.pendingAction) return false;
    if (context.pendingAction.actionType !== "play") return false;
    if (context.pendingAction?.location?.row !== row) return false;
    if (context.pendingAction?.location?.col !== col) return false;
    return true;
  }

  function isLastPlayHere(
    context: ContextPackage,
    row: number,
    col: number
  ): boolean {
    if (!context.lastAction) return false;
    if (context.lastAction.actionType !== "play") return false;
    if (context.lastAction?.location?.row !== row) return false;
    if (context.lastAction?.location?.col !== col) return false;
    return true;
  }

  let stoneImage = blackStone;
  if (props.content == "w") stoneImage = whiteStone;

  // occupied cell
  if (props.content == "b" || props.content == "w") {
    const lastPlayIconColor = props.content == "b" ? "white" : "black";
    return (
      <div className={styles.boardIntersectionWithStone}>
        {intersectionBG(props.row,props.col)}
       {/*  <IntersctionSVG /> */}
        <Image m="5%" className={styles.stone} src={stoneImage} />
        {isLastPlayHere(contextPackage, props.row, props.col) && (
          <LastTurnSVG stoneColor={lastPlayIconColor} />
        )}
      </div>
    );
  }
  //NOT  my turn and empty cell
  if (!props.isMyTurn) {
    return  intersectionBG(props.row,props.col);
  } else {
    // my turn and empty cell
    return (
      <div
        onClick={() => props.onSelectIntersection(props.row, props.col)}
        className={` ${styles.intersectionHover} ${styles.emptyIntersection}`}
      >
         {intersectionBG(props.row,props.col)}
        {isPendingActionHere(contextPackage, props.row, props.col) && (
          <PendingPlaySVG stoneColor="#000000" />
        )}
      </div>
    );
  }
};

function intersectionBG(row:number, col:number): JSX.Element {

  // console.log('intersection row col: ',row,col)
   if((row==0) && (col==0)  )  return <UpperLeftSVG/>;
   if((row==0) && (col>0)&& (col<18)   )  return <TopRowSVG/>;
   if((row==0) &&  (col==18)   )  return <UpperRightSVG/>;

   if((row==18) && (col==0)  )  return <LowerLeftSVG/>;
   if((row==18) && (col>0)&& (col<18)   )  return <BottomRowSVG/>;
   if((row==18) &&  (col==18)   )  return <LowerRightSVG/>;

   if((row>0) &&(row<18) &&   (col==0)   )  return <LeftEdgeSVG/>;
   if((row>0) &&(row<18) &&   (col==18)   )  return <RightEdgeSVG/>;

   if((row==3) && (col==3)  )  return <IntersectionDotSVG/>;
   if((row==3) && (col==15)  )  return <IntersectionDotSVG/>; 
   if((row==15) && (col==15)  )  return <IntersectionDotSVG/>; 
   if((row==15) && (col==3)  )  return <IntersectionDotSVG/>;
   if((row==3) && (col==9)  )  return <IntersectionDotSVG/>;
   if((row==9) && (col==3)  )  return <IntersectionDotSVG/>;
   if((row==9) && (col==15)  )  return <IntersectionDotSVG/>;
   if((row==9) && (col==9)  )  return <IntersectionDotSVG/>;
   if((row==15) && (col==9)  )  return <IntersectionDotSVG/>;
  return   <IntersectionSVG />;
}


export default IntersectionBackGround;
