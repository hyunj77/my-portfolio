import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import { useColorMode } from '../context/ColorModeContext.jsx'

function ThemeToggle({ sx }) {
  const { mode, toggleMode } = useColorMode()
  const isDark = mode === 'dark'

  return (
    <IconButton
      onClick={toggleMode}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
      sx={{ position: 'relative', width: 40, height: 40, overflow: 'hidden', ...sx }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          transform: isDark ? 'translateY(-28px) rotate(-90deg)' : 'translateY(0) rotate(0deg)',
          opacity: isDark ? 0 : 1,
        }}
      >
        <LightModeRoundedIcon fontSize="small" sx={{ color: 'primary.main' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          transform: isDark ? 'translateY(0) rotate(0deg)' : 'translateY(28px) rotate(90deg)',
          opacity: isDark ? 1 : 0,
        }}
      >
        <DarkModeRoundedIcon fontSize="small" sx={{ color: 'primary.main' }} />
      </Box>
    </IconButton>
  )
}

export default ThemeToggle
