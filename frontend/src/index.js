import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import App from './App'

import AuthContextProvider from './context/AuthContext'
import FilesContextProvider from './context/FilesContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FilesContextProvider>
        <App />
      </FilesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
