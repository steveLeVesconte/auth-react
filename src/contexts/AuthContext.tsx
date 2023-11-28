import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

interface IAuthProviderProps {
    children: JSX.Element
}

const AuthContext = React.createContext({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAuth(): any {
    return useContext(AuthContext)
}


export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentUser, setCurrentUser] = useState<any>();
    const [loading, setLoading] = useState(true);

    function login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password);//returns promise
    }

    function signup(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);//returns promise
    }

    function resetPassword(email: string) {
        return auth.sendPasswordResetEmail(email);//returns promise
    }

    function updateEmail(email: string) {
        return currentUser.updateEmail(email);//returns promise
    }
    function updatePassword(password: string) {
        return currentUser.updatePassword(password);//returns promise
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;// unsubscribe from onAuthStateChanged when unmounted
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

