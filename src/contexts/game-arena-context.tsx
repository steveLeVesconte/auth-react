import { ReactNode, createContext, useContext, useState } from "react";
import { GameAction } from "../services/data/turn-service";

export type GameActionState = {
  pendingAction: GameAction | null | undefined;
  onGameAction: (gameAction: GameAction) => void;
};

export type TurnState = {
  lastAction: GameAction | null | undefined;
  turnNumber: number;
};

export type BoardState = {
  isPlayersTurn: boolean;
};

export type GameArenaContextType = {
  gameActionState: GameActionState | null;
  setGameActionState: React.Dispatch<
    React.SetStateAction<null | GameActionState>
  >;
  turnState: TurnState | null;
  setTurnState: React.Dispatch<React.SetStateAction<null | TurnState>>;
  boardState: BoardState | null;
  setBoardState: React.Dispatch<React.SetStateAction<null | BoardState>>;
};

export const GameArenaContext = createContext<null | GameArenaContextType>(
  null
);

interface ContextProviderProps {
  children: ReactNode;
}

export const GameArenaContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
  const [gameActionState, setGameActionState] =
    useState<null | GameActionState>(null);
  const [turnState, setTurnState] = useState<null | TurnState>(null);
  const [boardState, setBoardState] = useState<null | BoardState>(null);

  return (
    <GameArenaContext.Provider
      value={{
        gameActionState,
        setGameActionState,
        turnState,
        setTurnState,
        boardState,
        setBoardState,
      }}
    >
      {children}
    </GameArenaContext.Provider>
  );
};

export default GameArenaContextProvider;

export const useGameArenaContext = () => {
  const gameArenaContext = useContext(GameArenaContext);

  if (!gameArenaContext) {
    const gameActionState = {
      pendingAction: null,
      onGameAction: () => {},
    } as GameActionState;
    const turnState = null;
    const boardState = null;
    return {
      gameActionState,
      setGameActionState: () => {},
      turnState,
      setTurnState: () => {},
      boardState,
      setBoardState: () => {},
    } as GameArenaContextType;
  }
  return gameArenaContext;
};
