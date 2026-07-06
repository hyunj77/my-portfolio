import { Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import AboutMe from './pages/AboutMe.jsx'
import Projects from './pages/Projects.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      <Nav />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
