import ReactDOM from 'react-dom/client'
import './scss/custom.scss'
import App from './App'
import { ResultProvider } from './ResultContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <StrictMode>
  <ResultProvider>
    <App />
  </ResultProvider>,
  // </StrictMode>,
)
