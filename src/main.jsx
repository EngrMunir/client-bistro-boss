import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <HelmetProvider>
        <div className='max-w-screen-xl mx-auto'>
          <AuthProvider>
              <RouterProvider router={router} />
          </AuthProvider>
        </div>
      </HelmetProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
