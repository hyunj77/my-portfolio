import { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const TABS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
]

function Nav() {
  const { pathname } = useLocation()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const overlay = pathname === '/' && isDesktop
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!overlay) return undefined
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [overlay])

  const transparent = overlay && !scrolled

  return (
    <AppBar
      position={overlay ? 'fixed' : 'sticky'}
      sx={{
        bgcolor: transparent ? 'transparent' : '#ffffff',
        borderBottom: transparent ? 'none' : '1px solid #e4e6ea',
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1126,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, md: 3 },
          gap: 1.5,
        }}
      >
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            color: 'primary.main',
            textDecoration: 'none',
          }}
        >
          My Portfolio
        </Typography>
        <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 } }}>
          {TABS.map((tab) => (
            <Button
              key={tab.to}
              component={NavLink}
              to={tab.to}
              end={tab.to === '/'}
              sx={{
                color: 'text.secondary',
                px: { xs: 1, md: 2 },
                borderRadius: 0,
                borderBottom: '2px solid transparent',
                '&.active': {
                  color: 'primary.main',
                  borderBottomColor: 'primary.main',
                },
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
