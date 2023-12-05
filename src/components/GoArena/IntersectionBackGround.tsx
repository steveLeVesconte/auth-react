// import nonEdge from '../../assets/intersection.png'
// import leftSide from '../../assets/leftside.png'
// import rightSide from '../../assets/rightside.png'
// import upperLeft from '../../assets/upperLeft.png'
// import upperRight from '../../assets/upperRight.png'
// import top from '../../assets/top.png'
// import bottomLeft from '../../assets/lowerLeft.png'
// import bottomRight from '../../assets/lowerRight.png'
// import bottom from '../../assets/bottom.png'
import blackStone from '../../assets/blackStoneTrans.png'
import whiteStone from '../../assets/whiteStoneTrans.png'
import { Image } from '@chakra-ui/react';
import IntersctionSVG from './IntersctionSVG';
import PendingSVG from './PendingSVG';
import { useContext } from 'react';
import { ContextPackage, StoneContext } from './GoArena';
import LastTurnSVG from './LastTurnSVG';

interface Props {
    row: number;
    col: number;
    content: string;
    isMyTurn: boolean;
    onSelectIntersection: (row: number, col: number) => void;
}

const IntersectionBackGround = (props: Props) => {

    const contextPackage = useContext(StoneContext);

    function isPendingActionHere(context:ContextPackage,row:number,col:number):boolean{
        if(!context.isPlayersTurn) return false;
        if(!context.pendingAction) return false;
        if(context.pendingAction.actionType!=="play") return false;
        if(context.pendingAction?.location?.row!==row) return false;
        if(context.pendingAction?.location?.col!==col) return false;
        return true;

  }

  function isLastPlayHere(context:ContextPackage,row:number,col:number):boolean{
    //if(!context.isPlayersTurn) return false;
    if(!context.lastAction) return false;
    if(context.lastAction.actionType!=="play") return false;
    if(context.lastAction?.location?.row!==row) return false;
    if(context.lastAction?.location?.col!==col) return false;
    return true;

}

    let stoneImage = blackStone;
    if (props.content == 'w') stoneImage = whiteStone;
    // occupied cell
    if (props.content == 'b' || props.content == 'w'){
        const lastPlayIconColor=(props.content=="b")?"white":"black";
        
        return (
            <div className='boardIntersectionWithStone'>
                 <IntersctionSVG/>
                <Image m="5%" className='stone' src={stoneImage} />
                {(isLastPlayHere(contextPackage,props.row,props.col)) &&  <LastTurnSVG stoneColor={lastPlayIconColor} />}
       
          
            </div>
        );
    }
    //NOT  my turn and empty cell
    if (!props.isMyTurn) {
        return (
            <IntersctionSVG/>
        );
    } else {
        // my turn and empty cell
        return (<div onClick={() => props.onSelectIntersection(props.row, props.col)} className="intersctionClass intersection-hover emptyIntersection" >
            <IntersctionSVG/>
            {(isPendingActionHere(contextPackage,props.row,props.col)) &&  <PendingSVG stoneColor='#000000' />}
            
        </div>


        );
    }
}

// function getIntersctionImage(row: number, col: number): string {
//     if ((row > 0) && (row < 18) && (col > 0) && (col < 18)) {
//         return nonEdge;
//     }
//     if (row === 0) {
//         if (col === 0) {
//             return upperLeft;
//         }
//         if (col === 18) {
//             return upperRight;
//         }
//         return top;
//     }

//     if (row === 18) {
//         if (col === 0) {
//             return bottomLeft;
//         }
//         if (col === 18) {
//             return bottomRight;
//         }
//         return bottom;
//     }
//     if (col === 0) {
//         return leftSide;
//     }
//     else {
//         return rightSide;
//     }
// }

export default IntersectionBackGround