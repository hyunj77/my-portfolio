import { Link as RouterLink } from 'react-router-dom'
import { alpha, keyframes } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import SectionHeader from './SectionHeader.jsx'
import SkillIcon from './SkillIcon.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useColorMode } from '../context/ColorModeContext.jsx'
import { getCategoryColor } from '../data/skillsData.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

function SkillTreeSection() {
  const { homeData } = usePortfolio()
  const { mode } = useColorMode()
  const [revealRef, isVisible] = useScrollReveal()

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
      <Container
        ref={revealRef}
        maxWidth="sm"
        sx={{ opacity: isVisible ? 1 : 0, animation: isVisible ? `${fadeInUp} 0.6s ease-out both` : 'none' }}
      >
        <SectionHeader title="Skills" animate={isVisible} />
        <Stack
          direction="row"
          spacing={{ xs: 1, md: 3 }}
          useFlexGap
          sx={{ mt: 4, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {homeData.skills.map((skill, index) => {
            const color = getCategoryColor(skill.category, mode)
            return (
              <Grow key={skill.id} in={isVisible} timeout={400 + index * 100}>
                <Stack spacing={{ xs: 0.5, md: 1 }} sx={{ width: { xs: 64, md: 84 }, alignItems: 'center' }}>
                  <Tooltip title={skill.description} arrow placement="top">
                    <Box
                      tabIndex={0}
                      sx={{
                        width: { xs: 48, md: 56 },
                        height: { xs: 48, md: 56 },
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(color, 0.12),
                        willChange: 'transform, box-shadow',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        outline: 'none',
                        '@media (hover: hover)': {
                          '&:hover': {
                            transform: 'rotate(12deg) scale(1.12)',
                            boxShadow: `0 0 0 6px ${alpha(color, 0.16)}, 0 0 18px ${alpha(color, 0.55)}`,
                          },
                        },
                        '&:focus-visible': {
                          transform: 'rotate(12deg) scale(1.12)',
                          boxShadow: `0 0 0 6px ${alpha(color, 0.16)}, 0 0 18px ${alpha(color, 0.55)}`,
                        },
                      }}
                    >
                      <SkillIcon icon={skill.icon} color={color} sx={{ fontSize: { xs: 18, md: 28 } }} />
                    </Box>
                  </Tooltip>
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
