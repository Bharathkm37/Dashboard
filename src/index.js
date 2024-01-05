import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import App from './App';

ReactDOM.render(
  <BrowserRouter>
  <div style={{display:'flex', gap:'10px', height:'100vh'}}>
    <Sidebar/>
    <App/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
