import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactionsContext } from "../../hooks/useTransactionsContext"

export function Summary(){
    const {transactions} = useTransactionsContext()
    const completeSummary = transactions.reduce((reduce, transaction)=>{
        if(transaction.type === 'deposit'){
            reduce.deposit += transaction.amount
            reduce.total += transaction.amount
        }else {
            reduce.withdraw += transaction.amount
            reduce.total -= transaction.amount 
        }
        return reduce
    }, {
        deposit : 0,
        withdraw : 0,
        total : 0
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>{
                    new Intl.NumberFormat('pt-br', {
                        style : 'currency',
                        currency : 'BRL'
                    }).format(completeSummary.deposit)
                }</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saída" />
                </header>
                <strong>{
                        new Intl.NumberFormat('pt-br', {
                            style :'currency',
                            currency : 'BRL'
                        }).format(completeSummary.withdraw)
                    }</strong>
            </div>
            <div className={completeSummary.total > 0 ? "highlight-background" : "red-background"}>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{
                    Intl.NumberFormat('pt-br', {
                        style : 'currency',
                        currency : 'BRL'
                    }).format(completeSummary.total)
                }</strong>
            </div>
        </Container>
    )
}