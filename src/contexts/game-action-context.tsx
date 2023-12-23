import { ReactNode, createContext, useContext, useState } from "react";
import { GameAction } from "../services/data/turn-service";


export type GameActionState = {
  pendingAction: GameAction | null | undefined;
  onGameAction: (gameAction:GameAction) => void;
};

export type GameActionContextType = {
  gameActionState: GameActionState | null;
  setGameActionState: React.Dispatch<React.SetStateAction<null | GameActionState>>;
};

export const GameActionContext = createContext<null | GameActionContextType>(null);

interface ContextProviderProps {
  children: ReactNode;
}

export const GameActionContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
  const [gameActionState, setGameActionState] = useState<null | GameActionState>(null);

  return (
    <GameActionContext.Provider value={{ gameActionState, setGameActionState }}>
      {children}
    </GameActionContext.Provider>
  );
};

export default GameActionContextProvider;

export const useGameActionContext = () => {
  const gameActionContext = useContext(GameActionContext);

  if (!gameActionContext) {
    const gameActionState = {
      pendingAction: null,
      onGameAction:  () => {},
    } as GameActionState;

    return { gameActionState, setGameActionState: () => {} } as GameActionContextType;
  }
  return gameActionContext;
};
