import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function HeroSection() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 11 } }}
    >
      <Container
        maxWidth="md"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2.5 }}
      >
        <Chip
          label="Hero"
          size="small"
          sx={{ fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', bgcolor: 'primary.main', color: '#fff' }}
        />
        <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, letterSpacing: '-0.5px', maxWidth: 640 }}>
          여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  )
}

export default HeroSection
