//import React from 'react'
//import { Turn } from '../../firestore';
import BoardRow from './BoardRow';


interface Props {

    boardString:string;

    isMyTurn:boolean;

    onSelectIntersection: (row:number, col:number) => void;
    // 👇️ turn off type checking
   // playerId: (params: string) => void;
  }

const GoGameBoard = (props:Props) => {


  return (<>
 {/*    <h1>{location.state.match?.id} {location.state.match?.playerBlackName} {location.state.match?.playerWhiteName} turn number {location.state.match?.turnNumber}</h1> */}
 {/*    <h1> {turn?.playerBlackName} {turn?.playerWhiteName} turn-turnNumber: {turn?.turnNumber} player of last turn: {turn?.turnPlayerColor} x {turn?.resultState.board}x</h1>
 */}  
   {createRows(props.boardString,props.onSelectIntersection, props.isMyTurn)}
{/*     <Link to="/">Home</Link>
    <div>{utilities.getIsMyTurn(turn,player)?"myturn":"notMyTurn"}</div> */}
    </>
   );

}



const createRows=(boardString:string,onSelectIntersection:(row:number, col:number)=>void,isMyTurn:boolean):JSX.Element[]=>{
    console.log(' boardString xxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxx',boardString);
    const content:JSX.Element[] = [];
  //if(turn){
    //const turnString=turn?.resultState.board??"";
    const rowStringsArray:string[]=boardString.split(',');
    console.log(' rowStringArrayxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxx ',rowStringsArray);
    //const content:JSX.Element[] = [];

   // rowStringsArray.forEach(r=>{content.push(<BoardRow row={x} content="_________b_________"/>);})

    for(let x=0; x<19; x++) {
      content.push(<BoardRow key={x} row={x} content={rowStringsArray[x]} isMyTurn={isMyTurn} onSelectIntersection={onSelectIntersection}/>);
    }
//}
    return content;
}
export default GoGameBoard


