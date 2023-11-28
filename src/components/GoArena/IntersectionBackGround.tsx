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

interface Props {
    row: number;
    col: number;
    content: string;
    isMyTurn: boolean;
    onSelectIntersection: (row: number, col: number) => void;
}

const IntersectionBackGround = (props: Props) => {

    let stoneImage = blackStone;
    if (props.content == 'w') stoneImage = whiteStone;
    // occupied cell
    if (props.content == 'b' || props.content == 'w')
        return (
            <div className='boardIntersectionWithStone'>
                 <IntersctionSVG/>
                <Image m="5%" className='stone' src={stoneImage} />
            </div>
        );
    //NOT  my turn and empty cell
    if (!props.isMyTurn) {
        return (
            <IntersctionSVG/>
        );
    } else {
        // my turn and empty cell
        return (<div onClick={() => props.onSelectIntersection(props.row, props.col)} className="intersctionClass intersection-hover" >
            <IntersctionSVG/>
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