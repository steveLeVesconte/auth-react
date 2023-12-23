import { ReactNode, createContext, useContext, useState } from "react";
import { GameAction } from "../services/data/turn-service";


export type TurnState = {
 // pendingAction: GameAction | null | undefined;//1  i p
  lastAction: GameAction | null | undefined;///drop
 // isPlayersTurn: boolean;///2  i p
 // onSelectIntersection: (row: number, col: number) => void;//1  i
  turnNumber: number;//3  i  p
 // isContext: boolean;
};

export type TurnStateContextType = {
  turnState: TurnState | null;
  setTurnState: React.Dispatch<React.SetStateAction<null | TurnState>>;
};

export const TurnStateContext = createContext<null | TurnStateContextType>(null);

interface ContextProviderProps {
  children: ReactNode;
}

export const TurnStateContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
  const [turnState, setTurnState] = useState<null | TurnState>(null);

  return (
    <TurnStateContext.Provider value={{ turnState, setTurnState }}>
      {children}
    </TurnStateContext.Provider>
  );
};

export default TurnStateContextProvider;

export const useTurnStateContext = () => {
  const turnStateContext = useContext(TurnStateContext);

  if (!turnStateContext) {
    const turnState = {
    //  pendingAction: null,
      lastAction: null,
     // isPlayersTurn: false,
    //  onSelectIntersection: () => {},
      turnNumber: -1,
     // isContext: false,
    } as TurnState;

    return { turnState, setTurnState: () => {} } as TurnStateContextType;
  }
  return turnStateContext;
};
