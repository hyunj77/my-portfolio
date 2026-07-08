import { Link as RouterLink } from 'react-router-dom'
import { alpha, keyframes } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
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

function SkillTreeSection() {
  const { homeData } = usePortfolio()
  const [revealRef, isVisible] = useScrollReveal()

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
      <Container
        ref={revealRef}
        maxWidth="sm"
        sx={{ opacity: isVisible ? 1 : 0, animation: isVisible ? `${fadeInUp} 0.6s ease-out both` : 'none' }}
      >
        <SectionHeader title="Skills" />
        <Stack
          direction="row"
          spacing={{ xs: 1, md: 3 }}
          useFlexGap
          sx={{ mt: 4, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {homeData.skills.map((skill, index) => {
            const color = categoryColors[skill.category] ?? '#3d5afe'
            return (
              <Grow key={skill.id} in={isVisible} timeout={400 + index * 100}>
                <Stack spacing={{ xs: 0.5, md: 1 }} sx={{ width: { xs: 64, md: 84 }, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: { xs: 48, md: 56 },
                      height: { xs: 48, md: 56 },
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(color, 0.12),
                    }}
                  >
                    <SkillIcon icon={skill.icon} color={color} sx={{ fontSize: { xs: 18, md: 28 } }} />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, textAlign: 'center', fontSize: { xs: '0.68rem', md: '0.875rem' } }}
                  >
                    {skill.name}
                  </Typography>
                </Stack>
              </Grow>
            )
          })}
        </Stack>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={RouterLink}
            to="/about"
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardRoundedIcon />}
            aria-label="About Me 탭에서 전체 스킬 보기"
          >
            전체 스킬 보기
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default SkillTreeSection
