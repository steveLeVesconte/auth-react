import {create} from 'zustand';
import {GameAction} from '../services/data/turn-service'

interface IGameState{
    pendingAction: GameAction|null;
    updatePendingAction: (newPendingAction: GameAction|null )=>void ,
    lastAction:GameAction|null;
    updateLastAction: (newLastAction: GameAction|null )=>void ,
  
    isPlayerTurn: boolean;
    updateIsPlayerTurn: (newIsPlayerTurn: boolean )=>void ,

    turnNumber:number;
    updateTurnNumber: (newTurnNumber: number )=>void ,

    onConfirmAction: ((actionToExecute:GameAction)=>void)|null;
    updateOnConfirmAction: (newOnConfirmAction: ((actionToExecute:GameAction)=>void) )=>void ,

    onCancelAction: (()=>void)|null;
    updateOnCancelAction: (newOnCancelAction: (()=>void) )=>void ,


}

export const useGameStateStore = create<IGameState>((set)=>({
  
        pendingAction: null,
        updatePendingAction: (newPendingAction:GameAction|null)=> set({pendingAction:newPendingAction}),
        lastAction: null,
        updateLastAction: (newLastAction:GameAction|null)=> set({lastAction:newLastAction}),
    
        isPlayerTurn: false,
        updateIsPlayerTurn: (newIsPlayerTurn:boolean)=> set({isPlayerTurn:newIsPlayerTurn}),
  
        turnNumber:-1,
        updateTurnNumber: (newTurnNumber:number)=> set({turnNumber:newTurnNumber}),

        onConfirmAction:null,
        updateOnConfirmAction: (newOnConfirmAction:(actionToExecute:GameAction)=>void)=> set({onConfirmAction:newOnConfirmAction}),

        onCancelAction:null,
        updateOnCancelAction: (newOnCancelAction:()=>void)=> set({onCancelAction:newOnCancelAction}),

    })
);