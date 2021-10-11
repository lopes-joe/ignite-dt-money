import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface TransactionsContextProviderProps {
    children : ReactNode
}
interface TransactionsContextProps {
    transactions : Transaction[],
    createTransaction : (transaction : NewTransaction)=> void
}
interface Transaction {
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt : Date 
}
type NewTransaction = Omit<Transaction, "id" | "createdAt">
interface TransactionsResponse {
  data : {
      transactions : Transaction[]
  }
}

export const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps)

export function TransactionsContextProvider(props : TransactionsContextProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])
    useEffect(()=>{
        api.get('transactions')
        .then((response : TransactionsResponse) => setTransactions(response.data.transactions))
    }, [])

    function createTransaction(transaction : NewTransaction){
        api.post('/transactions', transaction)
    }
    
    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {props.children}
        </TransactionsContext.Provider>
    )
}