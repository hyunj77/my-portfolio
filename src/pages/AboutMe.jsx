import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import SectionHeader from '../components/SectionHeader.jsx'

function AboutMe() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <SectionHeader title="About Me" />
        <Card variant="outlined" sx={{ mt: 4, maxWidth: 720, mx: 'auto', bgcolor: 'background.paper' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', color: 'text.secondary', lineHeight: 1.7 }}>
            <p style={{ margin: 0 }}>About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.</p>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default AboutMe
