import { alpha, createTheme } from '@mui/material/styles'

// 팔레트에 없는, 장식용 그라데이션/스월 등에서 반복 사용되는 브랜드 색조 (라이트 모드).
// 컴포넌트에서 직접 hex를 다시 적지 말고 이 값들을 import해서 쓴다.
export const brandTints = {
  accentBlue: '#7c9bff',
  accentBlueSoft: '#8fa8ff',
  accentBlueMuted: '#6b8bff',
  accentLavender: '#c8b6ff',
  wash: '#eef1fb',
  washSoft: '#f4f6fb',
  navBorder: '#e4e6ea',
}

// 다크 모드용 동일 역할의 색조.
export const brandTintsDark = {
  accentBlue: '#5f7fe0',
  accentBlueSoft: '#4a5f9e',
  accentBlueMuted: '#3d4f82',
  accentLavender: '#4a4270',
  wash: '#141726',
  washSoft: '#1a1f33',
  navBorder: '#2a2f42',
}

const palettes = {
  light: {
    primary: { main: '#4272f6', light: '#e7edfe', dark: '#2c50c9', contrastText: '#ffffff' },
    secondary: { main: '#f5e42a', dark: '#d9c400', contrastText: '#2c2a00' },
    background: { default: '#ffffff', paper: '#f9fafc' },
    text: { primary: '#20242b', secondary: '#6b7280' },
  },
  dark: {
    primary: { main: '#7c9bff', light: '#26325c', dark: '#c8d4ff', contrastText: '#0b0e1a' },
    secondary: { main: '#f5e42a', dark: '#d9c400', contrastText: '#2c2a00' },
    background: { default: '#0f1117', paper: '#171a22' },
    text: { primary: '#eef1fb', secondary: '#9aa3b5' },
  },
}

export default function createAppTheme(mode = 'light') {
  const navBorder = mode === 'dark' ? brandTintsDark.navBorder : brandTints.navBorder

  return createTheme({
    palette: {
      mode,
      ...palettes[mode],
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: '"Pretendard Variable", Pretendard, system-ui, "Segoe UI", Roboto, sans-serif',
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
            const isContained = ownerState.variant === 'contained'

            const activeState = glowColor && {
              transform: 'perspective(600px) rotateX(-4deg) translateY(-3px)',
              boxShadow: `0 12px 26px ${alpha(glowColor, 0.45)}`,
              ...(isContained && { backgroundPosition: '-40% 0' }),
            }

            return {
              position: 'relative',
              borderRadius: 8,
              padding: '10px 24px',
              willChange: 'transform',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-position 0.6s ease',
              ...(isContained && {
                backgroundImage: 'linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)',
                backgroundSize: '260% 100%',
                backgroundPosition: '140% 0',
              }),
              ...(activeState && {
                '@media (hover: hover)': { '&:hover': activeState },
                '&:focus-visible': activeState,
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
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            boxShadow: 'none',
            borderBottom: `1px solid ${navBorder}`,
          }),
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollbarGutter: 'stable',
          },
          body: {
            transition: 'background-color 0.35s ease, color 0.35s ease',
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
}
