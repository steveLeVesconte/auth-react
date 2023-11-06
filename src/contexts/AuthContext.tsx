import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

interface IAuthProviderProps {
    children: JSX.Element
  }
  

const AuthContext = React.createContext({});

export function useAuth():any {
    return useContext(AuthContext)
}


export function AuthProvider({ children }: IAuthProviderProps) :JSX.Element {
    const [currentUser, setCurrentUser] = useState<any>();

    function signup(email:string, password:string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, []);

    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
    });

    const value = {
        currentUser,
        signup

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
            </AuthContext.Provider>
    )
}

