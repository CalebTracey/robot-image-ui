import ReactDOM from 'react-dom/client'
import './scss/custom.scss'
import React from 'react'
import App from './App'
import { ResultProvider } from './context/ResultContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ResultProvider>
            <App />
        </ResultProvider>
    </React.StrictMode>,
)
