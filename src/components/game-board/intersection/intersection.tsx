import IntersectionBackGround from "../intersection-background/intersection-background";

interface Props {
  row: number;
  col: number;
  content: string;
  isMyTurn: boolean;//////
  onSelectIntersection: (row: number, col: number) => void;/////
}

const Intersection = (props: Props) => {
  return (
    <>
      <div key={props.row.toString() + "-" + props.col.toString()}>
        <IntersectionBackGround
          onSelectIntersection={props.onSelectIntersection}
          row={props.row}
          col={props.col}
          content={props.content}
          isMyTurn={props.isMyTurn}
        />
      </div>
    </>
  );
};

export default Intersection;
