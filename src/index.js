import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './services/ContextShare';
import AuthContext from './services/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
    <ContextShare>
     <AuthContext> 
      <App />
      </AuthContext>
      </ContextShare>
    </BrowserRouter>
  </React.StrictMode>
);


