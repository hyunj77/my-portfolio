import { useCallback, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { keyframes } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SectionHeader from '../components/SectionHeader.jsx'
import SkillsSection from '../components/SkillsSection.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

function AboutMe() {
  const { aboutMeData } = usePortfolio()
  const { basicInfo, sections } = aboutMeData
  const [expandedId, setExpandedId] = useState(sections[0]?.id ?? false)
  const [revealRef, isVisible] = useScrollReveal()

  const handleAccordionChange = useCallback(
    (sectionId) => (event, isExpanded) => {
      setExpandedId(isExpanded ? sectionId : false)
    },
    [],
  )

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container ref={revealRef} maxWidth="md">
        <SectionHeader title="About Me" animate={isVisible} />

        <Card
          variant="outlined"
          sx={{
            mt: 4,
            maxWidth: 720,
            mx: 'auto',
            bgcolor: 'background.paper',
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? `${fadeInUp} 0.5s ease-out both` : 'none',
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 5 }, textAlign: 'center' }}>
            <Avatar
              role="img"
              aria-label="프로필 사진"
              sx={{
                width: { xs: 80, sm: 88, md: 96 },
                height: { xs: 80, sm: 88, md: 96 },
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.light',
              }}
            >
              <PersonIcon sx={{ fontSize: { xs: '2.5rem', sm: '2.75rem', md: '3rem' }, color: 'primary.dark' }} aria-hidden="true" />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {basicInfo.name}
            </Typography>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ mt: 2, justifyContent: 'center', alignItems: 'center', color: 'text.secondary' }}
            >
              <LocationOnIcon fontSize="small" aria-hidden="true" />
              <Typography variant="body2">Busan, South Korea</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, maxWidth: 720, mx: 'auto' }}>
          {sections.map((section, index) => (
            <Accordion
              key={section.id}
              variant="outlined"
              expanded={expandedId === section.id}
              onChange={handleAccordionChange(section.id)}
              sx={{
                mb: 2,
                '&:before': { display: 'none' },
                bgcolor: 'background.paper',
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `${fadeInUp} 0.5s ease-out ${index * 0.1}s both` : 'none',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon aria-hidden="true" />}>
                <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{section.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      <SkillsSection />
    </Box>
  )
}

export default AboutMe
