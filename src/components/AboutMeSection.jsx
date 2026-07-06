import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { alpha, keyframes } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PersonIcon from '@mui/icons-material/Person'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import SectionHeader from './SectionHeader.jsx'
import SkillIcon from './SkillIcon.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { categoryColors } from '../data/skillsData.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

function AboutMeSection() {
  const { homeData } = usePortfolio()
  const { basicInfo, content, skills } = homeData
  const mainContent = useMemo(
    () => content.find((section) => section.id === 'dev-story') ?? content[0],
    [content],
  )
  const [revealRef, isVisible] = useScrollReveal()

  return (
    <Box id="home-about-me" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 72, bgcolor: 'primary.main' }}>
      <Container
        ref={revealRef}
        maxWidth="md"
        sx={{ opacity: isVisible ? 1 : 0, animation: isVisible ? `${fadeInUp} 0.6s ease-out both` : 'none' }}
      >
        <SectionHeader title="About Me" light />

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card variant="outlined" sx={{ height: '100%', bgcolor: 'background.paper' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {mainContent && (
                  <>
                    <Typography sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>{mainContent.title}</Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{mainContent.summary}</Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined" sx={{ height: '100%', bgcolor: 'background.paper' }}>
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: { xs: 3, md: 4 },
                  textAlign: 'center',
                }}
              >
                <Avatar
                  role="img"
                  aria-label="프로필 사진"
                  sx={{ width: 72, height: 72, mx: 'auto', mb: 1.5, bgcolor: 'primary.light' }}
                >
                  <PersonIcon sx={{ fontSize: '2.25rem', color: 'primary.dark' }} aria-hidden="true" />
                </Avatar>
                <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>{basicInfo.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card variant="outlined" sx={{ mt: 3, bgcolor: 'background.paper' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {skills.map((skill, index) => {
                const color = categoryColors[skill.category] ?? '#3d5afe'
                return (
                  <Grow key={skill.id} in={isVisible} timeout={400 + index * 100}>
                    <Stack spacing={0.75} sx={{ width: 72, alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha(color, 0.12),
                        }}
                      >
                        <SkillIcon icon={skill.icon} color={color} sx={{ fontSize: 22 }} />
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'center' }}>
                        {skill.name}
                      </Typography>
                    </Stack>
                  </Grow>
                )
              })}
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            component={RouterLink}
            to="/about"
            variant="outlined"
            endIcon={<ArrowForwardRoundedIcon />}
            aria-label="About Me 탭에서 더 알아보기"
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.7)',
              '&:hover': {
                borderColor: '#fff',
                bgcolor: 'rgba(255,255,255,0.12)',
                boxShadow: '0 6px 22px rgba(255,255,255,0.55)',
              },
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutMeSection
