import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionsContextProviderProps {
    children : ReactNode
}
interface TransactionsContextProps {
    transactions : Transaction[],
    createTransaction : (transaction : NewTransaction)=> Promise<void>
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
interface GetTransactionsResponse {
    data : { transactions : Transaction[] }
}
interface PostTransactionResponse { 
    data : { transaction : Transaction }
}

const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps)

export function TransactionsContextProvider(props : TransactionsContextProviderProps){
    
    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    useEffect(()=>{
        api.get('transactions')
        .then((response : GetTransactionsResponse) => setTransactions(response.data.transactions))
    }, [])
    
    async function createTransaction(newTransaction : NewTransaction){
        const response : PostTransactionResponse = await api.post('/transactions', {
            ...newTransaction,
            createdAt : new Date
        })
        setTransactions([...transactions, response.data.transaction])
    }
    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {props.children}
        </TransactionsContext.Provider>
    )
}

export function useTransactionsContext(){
    const context = useContext(TransactionsContext)
    return context
}