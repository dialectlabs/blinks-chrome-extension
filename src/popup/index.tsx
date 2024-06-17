import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Popup } from './Popup';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <div className="h-[600px] w-[360px]">
      <Popup />
    </div>
  </React.StrictMode>,
);
