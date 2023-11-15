import React, {createContext, useEffect, useState} from 'react'
import {  getPlayer, Player } from '../firestore';
import { auth } from '../firebase';


export const PlayerContext = createContext<Player|null>(null);


interface IAuthProviderProps {
    children: JSX.Element
  }

const PlayerContextProvider = ({ children }: IAuthProviderProps) :JSX.Element=>{
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [player, setPlayer]=useState<Player>({} as Player);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user){
           // const player:Player=await 
            getPlayer(user?.uid).then((player)=>{
                console.log('setting currnt player: ',player);
         
                setPlayer(player as Player);
            })
            console.log('setting currnt user: ',user);
            if(player){
            setPlayer(player);
            }
            }
          //  setCurrentUser(user);
          //  console.log('setting currnt user uid: ',user?.uid);
            
          //  setLoading(false);
        })
        return unsubscribe;// unsubscribe from onAuthStateChanged when unmounted
    }, []);

    // useEffect(() => {
    //     if (groceryListId) {
    //       FirestoreService.getGroceryList(groceryListId)
    //         .then(groceryList => {
    //           if (groceryList.exists) {
    //             setError(null);
    //             setGroceryList(groceryList.data());
    //           } else {
    //             setError('grocery-list-not-found');
    //             setGroceryListId();
    //           }
    //         })
    //         .catch(() => setError('grocery-list-get-fail'));
    //     }
    //   }, [groceryListId, setGroceryListId]);


    // const value = {
    //     player

    // }


    return(
        <PlayerContext.Provider value={player}>
            {children}
        </PlayerContext.Provider>
    );
}

export default PlayerContextProvider;