import Box from '@mui/material/Box'
import { useScrollProgress } from '../hooks/useScrollProgress.js'

function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${progress}%`,
        bgcolor: 'primary.main',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        transition: 'width 0.1s ease-out',
        pointerEvents: 'none',
      }}
    />
  )
}

export default ScrollProgressBar
