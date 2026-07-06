import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function SectionHeader({ title }) {
  return (
    <Box sx={{ textAlign: 'center', mb: 1 }}>
      <Typography
        variant="h4"
        sx={{
          display: 'inline-block',
          fontSize: '1.6rem',
          position: 'relative',
          pb: 1,
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 4,
            right: 4,
            bottom: 0,
            height: 4,
            borderRadius: 2,
            bgcolor: 'primary.light',
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default SectionHeader
