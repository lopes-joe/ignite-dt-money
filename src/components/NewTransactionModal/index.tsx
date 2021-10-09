import { FormEvent, useState } from "react"
import Modal from "react-modal"
import { Container, TransactionTypeContainer, RadioBox} from "./style"
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
interface NewTransactionModalProps {
    isOpen : boolean,
    onRequestClose : ()=> void
}

export function NewTransactionModal({isOpen, onRequestClose} : NewTransactionModalProps){    
    const [title, setTitle] = useState('')
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')
    function handleCreateNewTransaction(event : FormEvent){
        console.log("entrou no handleCreateNewTransaction()")
        event.preventDefault()
        console.log({
            title,
            value,
            category,
            type
        } )
    }
    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay" 
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>My first modal Jeová Jiré</h2>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}
                />
                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        isActive= {type === 'deposit'}
                        onClick={()=> {setType('deposit')}}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button"
                        isActive= {type === 'withdraw'}
                        onClick={()=> {setType('withdraw')}}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                {/*<input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => event.target.value}
                />*/}
                <button 
                    type="submit"
                >
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}