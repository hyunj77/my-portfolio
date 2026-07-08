import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'

const AboutMe = lazy(() => import('./pages/AboutMe.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      <Nav />
      <Box component="main" sx={{ flex: 1 }}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Suspense>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
