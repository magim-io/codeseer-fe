import React from 'react';
import 'reactflow/dist/style.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReactFlowProvider } from 'reactflow';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </BrowserRouter>
);
