import Box from '@mui/material/Box'
import { keyframes } from '@mui/material/styles'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

function LoadingSpinner({ size = 36, sx }) {
  return (
    <Box
      role="status"
      aria-label="불러오는 중"
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '3px solid',
        borderColor: 'primary.light',
        borderTopColor: 'primary.main',
        animation: `${spin} 0.8s linear infinite`,
        mx: 'auto',
        ...sx,
      }}
    />
  )
}

export default LoadingSpinner
