
import IntersectionBackGround from './IntersectionBackGround';
import GoStone from './GoStone';

interface Props {

    row:number;
    col:number;
    content:string;
    isMyTurn:boolean;
    onSelectIntersection:(row:number, col:number)=>void;
  
    // 👇️ turn off type checking
   // playerId: (params: string) => void;
  }

const Intersection = (props:Props) => {
console.log('intersection: ',props)

    let intersectionHover="";

   if(props.isMyTurn && props.content=="_") intersectionHover="intersectionHover";


    return(<>

  <div className={intersectionHover} key={props.row.toString() +'-'+ props.col.toString()}>

    <IntersectionBackGround onSelectIntersection={props.onSelectIntersection} row={props.row} col={props.col} content={props.content} isMyTurn={props.isMyTurn} />
{/* 
    <GoStone content={props.content}/> */}
{/*     </IntersectionBackGround> */}
    </div>
    </>)
     


}

export default Intersection