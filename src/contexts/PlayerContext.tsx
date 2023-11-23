import { createContext, useEffect, useState } from 'react'
import { getPlayer, Player } from '../firestore';
import { auth } from '../firebase';


export const PlayerContext = createContext<Player | null>(null);


interface IAuthProviderProps {
    children: JSX.Element
}

const PlayerContextProvider = ({ children }: IAuthProviderProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [player, setPlayer] = useState<Player>({} as Player);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getPlayer(user?.uid).then((player) => {
                    console.log('setting currnt player: ', player);

                    setPlayer(player as Player);
                })
                console.log('setting currnt user: ', user);
                if (player) {
                    setPlayer(player);
                }
            }
        })
        return unsubscribe;// unsubscribe from onAuthStateChanged when unmounted
    }, []);

    return (
        <PlayerContext.Provider value={player}>
            {children}
        </PlayerContext.Provider>
    );
}

export default PlayerContextProvider;