import { ReactNode, createContext, useContext, useState } from "react";
//import { GameAction } from "../../../services/data/turn-service";

export type BoardState = {
 // pendingAction: GameAction | null | undefined;//1  i p
//  lastAction: GameAction | null | undefined;///drop
  isPlayersTurn: boolean;///2  i p
 // onSelectIntersection: (row: number, col: number) => void;//1  i
  //turnNumber: number;//3  i  p
  isContext: boolean;
};

export type BoardContextType = {
  boardState: BoardState | null;
  setBoardState: React.Dispatch<React.SetStateAction<null | BoardState>>;
};

export const BoardContext = createContext<null | BoardContextType>(null);

interface ContextProviderProps {
  children: ReactNode;
}

export const BoardContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
  const [boardState, setBoardState] = useState<null | BoardState>(null);

  return (
    <BoardContext.Provider value={{ boardState, setBoardState }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;

export const useBoardContext = () => {
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    const boardState = {
    //  pendingAction: null,
     // lastAction: null,
      isPlayersTurn: false,
    //  onSelectIntersection: () => {},
    //  turnNumber: -1,
      isContext: false,
    } as BoardState;

    return { boardState, setBoardState: () => {} } as BoardContextType;
  }
  return boardContext;
};
