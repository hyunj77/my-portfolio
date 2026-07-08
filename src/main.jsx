import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { PortfolioProvider } from './context/PortfolioContext.jsx'
import { ColorModeProvider } from './context/ColorModeContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeProvider>
      <ErrorBoundary>
        <HashRouter>
          <PortfolioProvider>
            <App />
          </PortfolioProvider>
        </HashRouter>
      </ErrorBoundary>
    </ColorModeProvider>
  </StrictMode>,
)
