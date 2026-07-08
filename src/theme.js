import { alpha, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4272f6',
      light: '#e7edfe',
      dark: '#2c50c9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f5e42a',
      dark: '#d9c400',
      contrastText: '#2c2a00',
    },
    background: {
      default: '#ffffff',
      paper: '#f9fafc',
    },
    text: {
      primary: '#20242b',
      secondary: '#6b7280',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          const hasGlow = ownerState.variant === 'contained' || ownerState.variant === 'outlined'
          const glowColor =
            hasGlow && ownerState.color && ownerState.color !== 'inherit'
              ? theme.palette[ownerState.color]?.main
              : null

          return {
            borderRadius: 8,
            padding: '10px 24px',
            transition: 'transform 0.2s ease, box-shadow 0.25s ease',
            ...(glowColor && {
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 22px ${alpha(glowColor, 0.4)}`,
              },
            }),
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#20242b',
          boxShadow: 'none',
          borderBottom: '1px solid #e4e6ea',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarGutter: 'stable',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
  },
})

export default theme
