import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import SectionHeader from './SectionHeader.jsx'

function AboutMeSection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="md">
        <SectionHeader title="About Me" />
        <Card variant="outlined" sx={{ mt: 4, maxWidth: 720, mx: 'auto', bgcolor: 'background.paper' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Box component="p" sx={{ color: 'text.secondary', fontSize: '1rem', lineHeight: 1.7, m: 0, mb: 3 }}>
              여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            </Box>
            <Button component={RouterLink} to="/about" variant="outlined" color="primary">
              더 알아보기
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default AboutMeSection
