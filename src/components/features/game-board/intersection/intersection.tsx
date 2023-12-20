import IntersectionBackGround from "../intersection-background/intersection-background";

interface Props {
  row: number;
  col: number;
  content: string;
}

const Intersection = (props: Props) => {
  return (
    <>
      <div key={props.row.toString() + "-" + props.col.toString()}>
        <IntersectionBackGround
          row={props.row}
          col={props.col}
          content={props.content}
        />
      </div>
    </>
  );
};

export default Intersection;
