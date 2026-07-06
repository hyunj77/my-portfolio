import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3 }}>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: 0.5 }}>
            HYUNJI SUN
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © 2026 My Portfolio. Built with React &amp; Supabase.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton
            component="a"
            href="mailto:hyunj2727@gmail.com"
            aria-label="이메일"
            size="small"
            sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
          >
            <EmailIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/hyunj77"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            size="small"
            sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            size="small"
            sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
