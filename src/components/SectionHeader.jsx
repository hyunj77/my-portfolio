import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { keyframes } from '@mui/material/styles'

const charIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

function SectionHeader({ title, light = false, underlineColor, animate = true }) {
  const chars = Array.from(title)

  return (
    <Box sx={{ textAlign: 'center', mb: 1 }}>
      <Typography
        variant="h4"
        aria-label={title}
        sx={{
          display: 'inline-block',
          fontSize: '1.85rem',
          position: 'relative',
          pb: 1.75,
          color: light ? '#fff' : 'text.primary',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 4,
            right: 4,
            bottom: 0,
            height: 4,
            borderRadius: 2,
            bgcolor: underlineColor ?? (light ? 'rgba(255,255,255,0.7)' : 'primary.light'),
          },
        }}
      >
        <Box component="span" aria-hidden="true">
          {chars.map((char, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                display: 'inline-block',
                opacity: animate ? 0 : 1,
                animation: animate ? `${charIn} 0.4s ease-out ${index * 0.035}s both` : 'none',
              }}
            >
              {char === ' ' ? ' ' : char}
            </Box>
          ))}
        </Box>
      </Typography>
    </Box>
  )
}

export default SectionHeader
