/* global document */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';

// const container = document.getElementById('root');

// const root = ReactDOM.createRoot(container);

// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path=":product_id" element={<App />} />
//     </Routes>
//   </BrowserRouter>
// );

  async function getComponent() {
    // const element = document.createElement('div');
    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    const { default: _ } = await import('lodash');

    return root;
   }

   getComponent().then((root) => {
    root.render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path=":product_id" element={<App />} />
        </Routes>
      </BrowserRouter>
    );
   });