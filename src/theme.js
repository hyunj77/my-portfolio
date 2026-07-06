import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9575cd',
      light: '#cdb4f0',
      dark: '#7e57c2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7e57c2',
    },
    background: {
      default: '#ffffff',
      paper: '#f6f1fc',
    },
    text: {
      primary: '#2d2440',
      secondary: '#5b5270',
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
        root: { borderRadius: 8, padding: '10px 24px' },
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
          color: '#2d2440',
          boxShadow: 'none',
          borderBottom: '1px solid #e6dbf7',
        },
      },
    },
  },
})

export default theme
