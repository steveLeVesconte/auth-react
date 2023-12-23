import { ReactNode, createContext, useContext, useState } from "react";

export type BoardState = {
  isPlayersTurn: boolean;
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
      isPlayersTurn: false,
      isContext: false,
    } as BoardState;

    return { boardState, setBoardState: () => {} } as BoardContextType;
  }
  return boardContext;
};
