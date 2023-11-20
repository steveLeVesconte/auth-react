
import IntersectionBackGround from './IntersectionBackGround';
import GoStone from './GoStone';

interface Props {

    row:number;
    col:number;
    content:string;
    // 👇️ turn off type checking
   // playerId: (params: string) => void;
  }

const Intersection = (props:Props) => {
console.log('intersection: ',props)
    return(<>

  <div key={props.row.toString() +'-'+ props.col.toString()}>

    <IntersectionBackGround row={props.row} col={props.col} content={props.content} />
{/* 
    <GoStone content={props.content}/> */}
{/*     </IntersectionBackGround> */}
    </div>
    </>)
     


}

export default Intersection