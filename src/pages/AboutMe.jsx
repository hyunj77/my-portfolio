import { useCallback, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonIcon from '@mui/icons-material/Person'
import SectionHeader from '../components/SectionHeader.jsx'
import SkillsSection from '../components/SkillsSection.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function AboutMe() {
  const { aboutMeData } = usePortfolio()
  const { basicInfo, sections } = aboutMeData
  const [expandedId, setExpandedId] = useState(sections[0]?.id ?? false)

  const handleAccordionChange = useCallback(
    (sectionId) => (event, isExpanded) => {
      setExpandedId(isExpanded ? sectionId : false)
    },
    [],
  )

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <SectionHeader title="About Me" />

        <Card variant="outlined" sx={{ mt: 3, maxWidth: 720, mx: 'auto', bgcolor: 'background.paper' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Avatar
              role="img"
              aria-label="프로필 사진"
              sx={{
                width: 96,
                height: 96,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.light',
              }}
            >
              <PersonIcon sx={{ fontSize: '3rem', color: 'primary.dark' }} aria-hidden="true" />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {basicInfo.name}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
              <Chip label={basicInfo.experience} size="small" color="primary" variant="outlined" />
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, maxWidth: 720, mx: 'auto' }}>
          {sections.map((section) => (
            <Accordion
              key={section.id}
              variant="outlined"
              expanded={expandedId === section.id}
              onChange={handleAccordionChange(section.id)}
              sx={{
                mb: 2,
                '&:before': { display: 'none' },
                bgcolor: 'background.paper',
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
