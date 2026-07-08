import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { keyframes, useTheme } from '@mui/material/styles'
import { useColorMode } from '../context/ColorModeContext.jsx'
import { brandTints, brandTintsDark } from '../theme.js'

const ROLES = ['Web Designer', 'AI Builder', 'Frontend Developer']
const TYPE_SPEED = 90
const DELETE_SPEED = 45
const PAUSE_AFTER_TYPE = 1400
const PAUSE_AFTER_DELETE = 400

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

// setTimeout으로 타이핑 -> 일시정지 -> 삭제 -> 다음 단어를 반복하는 롤 모핑 타이프라이터.
function RoleTypewriter({ sx }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')
  const theme = useTheme()
  const { mode } = useColorMode()
  const tints = mode === 'dark' ? brandTintsDark : brandTints
  const gradient = [theme.palette.primary.main, tints.accentBlueSoft, tints.accentLavender, theme.palette.primary.main].join(', ')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(ROLES[0])
      return undefined
    }

    const currentRole = ROLES[roleIndex]
    let timer

    if (phase === 'typing') {
      if (text.length < currentRole.length) {
        timer = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), TYPE_SPEED)
      } else {
        timer = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED)
      } else {
        timer = setTimeout(() => {
          setRoleIndex((index) => (index + 1) % ROLES.length)
          setPhase('typing')
        }, PAUSE_AFTER_DELETE)
      }
    }

    return () => clearTimeout(timer)
  }, [text, phase, roleIndex])

  return (
    <Box component="span" aria-label={ROLES.join(' / ')} sx={{ display: 'inline-block', ...sx }}>
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          display: 'inline-block',
          minWidth: '1ch',
          fontWeight: 800,
          backgroundImage: `linear-gradient(90deg, ${gradient})`,
          backgroundSize: '300% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: `${gradientShift} 6s linear infinite`,
        }}
      >
        {text}
      </Box>
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          display: 'inline-block',
          width: '2px',
          height: '0.9em',
          ml: '2px',
          bgcolor: 'primary.main',
          verticalAlign: '-0.1em',
          animation: `${blink} 1s steps(1) infinite`,
        }}
      />
    </Box>
  )
}

export default RoleTypewriter
