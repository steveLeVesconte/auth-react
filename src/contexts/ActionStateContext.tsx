/* import { createContext, useEffect, useState } from 'react'
import { ActionState,   } from '../firestore';
import { auth } from '../firebase';

export const ActionStateContext = createContext<ActionState | null>(null);

interface IAuthProviderProps {
    children: JSX.Element
}

const ActionStateContextProvider = ({ children }: IAuthProviderProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [actionState, setActionState] = useState<ActionState>({} as ActionState);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getPlayer(user?.uid).then((actionState) => {
                    setActionState(actionState as ActionState);
                })
                if (actionState) {
                    setActionState(actionState);
                }
            }
        })
        return unsubscribe;// unsubscribe from onAuthStateChanged when unmounted
    }, []);

    return (
        <ActionStateContext.Provider value={actionState}>
            {children}
        </ActionStateContext.Provider>
    );
}

export default ActionStateContextProvider; */