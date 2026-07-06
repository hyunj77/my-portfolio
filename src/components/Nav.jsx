import { Link as RouterLink, NavLink } from 'react-router-dom'
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
  return (
    <AppBar position="sticky">
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
