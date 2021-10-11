import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import {TransactionsContextProvider} from "./TransactionsContext";
Modal.setAppElement("#root")

export function App(){
 
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)  
  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  } 
  return (
    <>
      <TransactionsContextProvider>
        <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
        <Dashboard/>
        <GlobalStyle />
      </TransactionsContextProvider>
    </>
  );
}