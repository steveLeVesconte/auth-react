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

interface Props {
    row: number;
    col: number;
    content: string;
    isMyTurn: boolean;
    onSelectIntersection: (row: number, col: number) => void;
}

// const handlePlay = (row: number, col: number) => {
//     console.log("intersection click: ", row.toString() + '-' + col);
// }

const IntersectionBackGround = (props: Props) => {
    // const boardImage = getIntersctionImage(props.row, props.col);

   // let intersctionClass = "emptyIntersection ";
    /*     if (props.isMyTurn) {
            intersctionClass = intersctionClass + " intersectionHover";
        } */
    let stoneImage = blackStone;
    if (props.content == 'w') stoneImage = whiteStone;
    // occupied cell
    if (props.content == 'b' || props.content == 'w')
        return (
            <div className='parent'>
                {/*  <Image className='emptyIntersection' src={boardImage} /> */}
                <svg viewBox="0 0 100 100" className="svgBack emptyIntersection" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="black" stroke-width="2"  />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="black" stroke-width="2"  />

                </svg>
                <Image m="5%" className='stone' src={stoneImage} />
            </div>
        );
//NOT  my turn and empty cell
    if (!props.isMyTurn) {
        return (<>
            <svg viewBox="0 0 100 100" className="svgBack emptyIntersection" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="50" x2="100" y2="50" stroke="black" stroke-width="2"  />
                <line x1="50" y1="0" x2="50" y2="100" stroke="black" stroke-width="2"  />

            </svg>
            {/*  <Image className={intersctionClass} src={boardImage} /> */}
        </>
        );
    } else {
        // my turn and empty cell
        return (<div onClick={() => props.onSelectIntersection(props.row, props.col)} className="intersctionClass intersection-hover" >
            <svg viewBox="0 0 100 100" className="svgBack emptyIntersection" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="50" x2="100" y2="50" stroke="black" stroke-width="2"  />
                <line x1="50" y1="0" x2="50" y2="100" stroke="black" stroke-width="2"  />

            </svg>
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