import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';



import reportWebVitals from './reportWebVitals';



const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
     
        <App />
   
    </BrowserRouter>
  </QueryClientProvider>
);

// Measure app performance (optional)
reportWebVitals(console.log); // Replace with your analytics function if needed
