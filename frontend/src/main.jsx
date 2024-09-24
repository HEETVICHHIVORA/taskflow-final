import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'regenerator-runtime/runtime';

import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import AppContextProvider from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
    <App />
    <Toaster/>
    </AppContextProvider>
  </StrictMode>,
)
