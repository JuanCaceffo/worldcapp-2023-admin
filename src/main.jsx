import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { StyledEngineProvider } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
  // </React.StrictMode>,
)
