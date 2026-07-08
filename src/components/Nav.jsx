import { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { brandTints, brandTintsDark } from '../theme.js'
import { useScrollDirection } from '../hooks/useScrollDirection.js'
import { useColorMode } from '../context/ColorModeContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const TABS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
]

function HamburgerIcon({ open }) {
  const bar = {
    position: 'absolute',
    left: 0,
    display: 'block',
    width: 22,
    height: 2,
    borderRadius: 1,
    bgcolor: 'text.primary',
    transition: 'transform 0.3s ease, opacity 0.3s ease, top 0.3s ease',
  }

  return (
    <Box aria-hidden="true" sx={{ width: 22, height: 16, position: 'relative' }}>
      <Box component="span" sx={{ ...bar, top: open ? 7 : 0, transform: open ? 'rotate(45deg)' : 'none' }} />
      <Box component="span" sx={{ ...bar, top: 7, opacity: open ? 0 : 1 }} />
      <Box component="span" sx={{ ...bar, top: open ? 7 : 14, transform: open ? 'rotate(-45deg)' : 'none' }} />
    </Box>
  )
}

function Nav() {
  const { pathname } = useLocation()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const overlay = pathname === '/' && isDesktop
  const [heroVisible, setHeroVisible] = useState(pathname === '/')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const scrolledDown = useScrollDirection()
  const { mode } = useColorMode()
  const navBorder = mode === 'dark' ? brandTintsDark.navBorder : brandTints.navBorder

  // Hero 섹션이 화면에 보이는 동안만 네비바를 투명하게(Intersection Observer 기반).
  useEffect(() => {
    if (!overlay) return undefined
    const heroEl = document.getElementById('hero')
    if (!heroEl) {
      setHeroVisible(false)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      rootMargin: '-64px 0px 0px 0px',
      threshold: 0,
    })
    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [overlay, pathname])

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  const transparent = overlay && heroVisible
  const hideHeader = scrolledDown && !drawerOpen

  return (
    <>
      <AppBar
        position={overlay ? 'fixed' : 'sticky'}
        sx={{
          bgcolor: transparent ? 'transparent' : 'background.default',
          borderBottom: transparent ? 'none' : `1px solid ${navBorder}`,
          transform: hideHeader ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.3s ease',
          willChange: 'transform',
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

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {TABS.map((tab) => (
              <Button
                key={tab.to}
                component={NavLink}
                to={tab.to}
                end={tab.to === '/'}
                sx={{
                  color: 'text.secondary',
                  px: 2,
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

          <ThemeToggle />

          <IconButton
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={drawerOpen}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <HamburgerIcon open={drawerOpen} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }} role="navigation" aria-label="모바일 메뉴">
          <Stack spacing={0.5} sx={{ px: 1 }}>
            {TABS.map((tab) => (
              <Button
                key={tab.to}
                component={NavLink}
                to={tab.to}
                end={tab.to === '/'}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.secondary',
                  px: 2,
                  py: 1.25,
                  borderRadius: 1,
                  '&.active': {
                    color: 'primary.main',
                    bgcolor: 'primary.light',
                  },
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}

export default Nav
