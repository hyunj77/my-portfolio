import { useCallback, useEffect, useRef, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonIcon from '@mui/icons-material/Person'
import SectionHeader from '../components/SectionHeader.jsx'
import SkillsSection from '../components/SkillsSection.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function AboutMe() {
  const { aboutMeData, updateSectionContent } = usePortfolio()
  const { basicInfo, sections } = aboutMeData
  const [expandedId, setExpandedId] = useState(sections[0]?.id ?? false)
  const [isEditing, setIsEditing] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const previousDataRef = useRef(aboutMeData)

  useEffect(() => {
    if (previousDataRef.current === aboutMeData) {
      return undefined
    }
    previousDataRef.current = aboutMeData
    setShowSaved(true)
    const timer = setTimeout(() => setShowSaved(false), 1200)
    return () => clearTimeout(timer)
  }, [aboutMeData])

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

        <Stack direction="row" spacing={1.5} sx={{ mt: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            size="small"
            variant={isEditing ? 'contained' : 'outlined'}
            startIcon={<EditIcon />}
            aria-pressed={isEditing}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? '편집 완료' : '내용 편집'}
          </Button>
          <Fade in={showSaved} unmountOnExit>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'success.main' }}>
              <CheckCircleIcon fontSize="small" aria-hidden="true" />
              <Typography variant="body2" component="span">
                저장됨
              </Typography>
            </Stack>
          </Fade>
        </Stack>

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
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>{section.title}</Typography>
                  {section.showInHome && (
                    <Chip label="홈 노출" size="small" sx={{ bgcolor: 'primary.light', color: 'primary.dark' }} />
                  )}
                </Stack>
              </AccordionSummary>
              <AccordionDetails onClick={(event) => event.stopPropagation()}>
                <Fade in key={isEditing ? 'edit' : 'view'} timeout={300}>
                  <Box>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        value={section.content}
                        onChange={(event) => updateSectionContent(section.id, event.target.value)}
                        placeholder="내용을 입력하세요"
                        aria-label={`${section.title} 내용`}
                      />
                    ) : (
                      <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{section.content}</Typography>
                    )}
                  </Box>
                </Fade>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      <SkillsSection editable={isEditing} />
    </Box>
  )
}

export default AboutMe
