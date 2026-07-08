import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { keyframes } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import SectionHeader from './SectionHeader.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
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
        <SectionHeader title="About Me" light animate={isVisible} />

        <Box sx={{ mt: 6, display: 'flex', gap: { xs: 2.5, md: 4 } }}>
          <Box sx={{ width: 3, flexShrink: 0, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.5)' }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 2.5, flexWrap: 'wrap' }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{basicInfo.name}</Typography>
              {basicInfo.experience && (
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{basicInfo.experience}</Typography>
              )}
            </Stack>

            {mainContent && (
              <>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.75)',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {mainContent.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    lineHeight: 1.7,
                    mb: 3,
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    maxWidth: 620,
                  }}
                >
                  {mainContent.summary}
                </Typography>
              </>
            )}

            <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', mb: 3 }}>
              {skills.map((skill) => skill.name).join('  /  ')}
            </Typography>

            <Button
              component={RouterLink}
              to="/about"
              variant="text"
              endIcon={<ArrowForwardRoundedIcon />}
              aria-label="About Me 탭에서 더 알아보기"
              sx={{
                px: 0,
                fontWeight: 700,
                color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.6)',
                borderRadius: 0,
                '&:hover': { bgcolor: 'transparent', borderColor: '#fff' },
              }}
            >
              더 알아보기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutMeSection
