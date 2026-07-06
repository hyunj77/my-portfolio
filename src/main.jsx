import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { HashRouter } from 'react-router-dom'
import theme from './theme.js'
import App from './App.jsx'
import { PortfolioProvider } from './context/PortfolioContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <HashRouter>
          <PortfolioProvider>
            <App />
          </PortfolioProvider>
        </HashRouter>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
