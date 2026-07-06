import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SectionHeader from './SectionHeader.jsx'
import { initialAboutMeData } from '../data/aboutMeData.js'

function AboutMeSection() {
  const [aboutMeData] = useState(initialAboutMeData)
  const homeSections = aboutMeData.sections.filter((section) => section.showInHome)

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="md">
        <SectionHeader title="About Me" />
        <Card variant="outlined" sx={{ mt: 4, maxWidth: 720, mx: 'auto', bgcolor: 'background.paper' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Stack divider={<Divider flexItem sx={{ my: 2.5 }} />} sx={{ textAlign: 'left' }}>
              {homeSections.map((section) => (
                <Box key={section.id}>
                  <Typography sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>{section.title}</Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{section.content}</Typography>
                </Box>
              ))}
            </Stack>
            <Button component={RouterLink} to="/about" variant="outlined" color="primary" sx={{ mt: 3 }}>
              더 알아보기
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default AboutMeSection
