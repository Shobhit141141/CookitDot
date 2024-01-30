import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthcontextProvider } from './context/Authcontext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthcontextProvider>
      <App />
    </AuthcontextProvider>
  </React.StrictMode>,
)
