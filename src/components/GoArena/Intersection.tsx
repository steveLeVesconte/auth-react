import { useContext } from 'react';
import { ActionState } from '../../firestore';
import { ContextPackage, StoneContext } from './GoArena';
import IntersectionBackGround from './IntersectionBackGround';

interface Props {
    row: number;
    col: number;
    content: string;
    isMyTurn: boolean;
    onSelectIntersection: (row: number, col: number) => void;
    actionState:ActionState;
}

const Intersection = (props: Props) => {

    const contextPackage = useContext(StoneContext);

    function isPendingActionHere(context:ContextPackage,row:number,col:number):boolean{
          if(!context.isPlayersTurn) return false;
          if(!context.pendingAction) return false;
          if(context.pendingAction.actionType!=="play") return false;
          if(context.pendingAction?.location?.row!==row) return false;
          if(context.pendingAction?.location?.col!==col) return false;
          return true;

    }

/*     if((props.row==0)&&(props.col==0))
    {
        console.log('intersection *********',props);
    }
    let isPendingPlay=false;
    if(props.actionState){
    if( (props.actionState.pendingAction?.actionType=="play")&&
        (props.row==props.actionState.pendingAction.location?.row)&&
    (props.col==props.actionState.pendingAction.location?.col))
    {
       isPendingPlay=true;
       console.log('ding ding ding - pending ***',props.row,props.col)
    }
} */
    let intersectionHover = "";
    if (props.isMyTurn && props.content == "_") intersectionHover = "intersectionHover";

    return (<>
        <div className={intersectionHover} key={props.row.toString() + '-' + props.col.toString()}>
            <IntersectionBackGround onSelectIntersection={props.onSelectIntersection} row={props.row} col={props.col} content={props.content} isMyTurn={props.isMyTurn} />
            {(isPendingActionHere(contextPackage,props.row,props.col)) && <h1>pending! {contextPackage?.pendingAction?.location?.row}</h1>}
        </div>
    </>)
}

export default Intersection