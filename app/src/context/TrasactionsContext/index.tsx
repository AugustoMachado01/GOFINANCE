import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, ReactNode, useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"

interface TransactionsProps  {
    id: string
    name: string,
    amount: string,
    createdDate: string,
    categoryKey: string
    type: 'income' | 'outcome'
}

interface TransactionsContextType {
    transactions: TransactionsProps[],
    transactionsIsLoading: boolean
    addNewTransaction: (newTransaction: TransactionsProps) => void
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
    children: ReactNode
}

export  function TransactionsProvider({children}:TransactionsProviderProps){
    const [transactions,setTransactions] = useState<TransactionsProps[]>([])
    const [transactionsIsLoading, setTransactionsIsLoading] = useState(true)
    const {user} = useAuth()

    async function loadTransactions(){
        const dataKey = `@gofinances:transactions_user:${user?.id}`
        const response = await AsyncStorage.getItem(dataKey)
        if(response){
             const storage = JSON.parse(response)
             setTransactions(storage)
        }
        setTransactionsIsLoading(false)
     }
    
     useEffect(() => {
         loadTransactions()
    },[])

    function addNewTransaction(newTransaction: TransactionsProps){
        setTransactions(state => [newTransaction, ...state])
    }

    return( 
        <TransactionsContext.Provider value={{
            transactions,
            addNewTransaction,
            transactionsIsLoading
        }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}