import ReactDOM from 'react-dom/client'
import './scss/custom.scss'
import App from './App'
import { ResultProvider } from './context/ResultContext'
import React from 'react'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ResultProvider>
            <App />
        </ResultProvider>
    </React.StrictMode>,
)
