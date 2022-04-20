
import React,{createContext,useReducer} from "react";

const initialState={
    transactions:[
        /*
      { id: 1, text: 'Flower', amount: -20 },
     { id: 2, text: 'Salary', amount: 300 },
     { id: 3, text: 'Book', amount: -10 },     //dummy Transactions
    { id: 4, text: 'Camera', amount: 150 } */
    ]
}

const Reducer=(state,action)=>{
        switch(action.type){
            case 'DELETE_TRANSACTION':
                return {
                ...state,
                transactions: state.transactions.filter(transaction =>(transaction.id!== action.payload))
            }
            case 'ADD_TRANSACTION':
                return {
                  ...state,
                  transactions: [action.payload, ...state.transactions]
                }
            default:
                return state;
        }
}
export const GlobalContext=createContext();
export const GlobalProvider=({children})=>{

    const[state,dispatch]=useReducer(Reducer,initialState);
    
    const deleteTransaction=(id)=>{
       dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
       })
    }
    const addTransaction=(transaction)=> {
        dispatch({
          type: 'ADD_TRANSACTION',
          payload: transaction
        });
      }
    return(
        <GlobalContext.Provider value={{transactions:state.transactions
        ,deleteTransaction,addTransaction}}>
            {children}
        </GlobalContext.Provider>
    )
}