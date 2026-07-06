import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        © 2026 My Portfolio. Built with React &amp; Supabase.
      </Typography>
    </Box>
  )
}

export default Footer
