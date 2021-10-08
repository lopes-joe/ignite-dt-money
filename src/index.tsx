import { createServer } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

createServer({
  routes(){
    this.namespace = 'api'
    this.get('/transactions', ()=>{
      return [{
        atribute1 : "value of atribute 1",
        atribute2 : "value of atribute 2"
      }]
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);