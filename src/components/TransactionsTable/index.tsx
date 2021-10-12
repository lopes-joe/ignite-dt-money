import { useTransactionsContext } from "../../hooks/useTransactionsContext"
import { Container } from "./styles"

export function TransactionsTable(){
    
    const {transactions} = useTransactionsContext()
    
    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction)=>{
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td className={transaction.type}>
                                        {transaction.type === 'withdraw' && "-"}
                                        {new Intl.NumberFormat('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(transaction.amount)}
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{new Intl.DateTimeFormat('BRT').format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Container>
    ) 
}