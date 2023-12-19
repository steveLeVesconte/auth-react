import { createContext, useEffect, useState } from 'react'

import { auth } from '../firebase';
import { Player, getPlayer } from '../services/data/player-service';


// export interface ITodo {
//     id: number;
//     title: string;
//     description: string;
//     status: boolean;
//   }
  export type PlayerContextType = {
    player: Player|null;
    updatePlayer: (player:Player) => void;
  };




export const PlayerContext = createContext<PlayerContextType|null>(null);

interface IAuthProviderProps {
    children: JSX.Element
}

const PlayerContextProvider = ({ children }: IAuthProviderProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [player, setPlayer] = useState<Player|null>({} as Player);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getPlayer(user?.uid).then((player) => {
                    setPlayer(player as Player);
                })
                if (player) {
                    setPlayer(player);
                }
            }
        })
        return unsubscribe;// unsubscribe from onAuthStateChanged when unmounted
    }, []);


    const updatePlayer = (player: Player) => {
        setPlayer(player);
   
      }

    return (
        <PlayerContext.Provider value={{ player, updatePlayer}}>
            {children}
        </PlayerContext.Provider>
    );
}

export default PlayerContextProvider;