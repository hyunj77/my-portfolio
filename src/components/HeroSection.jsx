import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { alpha, keyframes } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonIcon from '@mui/icons-material/Person'
import SkillIcon from './SkillIcon.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { categoryColors } from '../data/skillsData.js'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(61, 90, 254, 0.35); }
  70% { box-shadow: 0 0 0 18px rgba(61, 90, 254, 0); }
  100% { box-shadow: 0 0 0 0 rgba(61, 90, 254, 0); }
`

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const HEADLINE_LINE1 = [
  { text: '다양한 경험을 ', gradient: false },
  { text: '하나의 서비스로', gradient: true },
]

const HEADLINE_LINE2 = [{ text: '연결하는 개발자입니다', gradient: false }]

const HEADLINE_LINE1_LENGTH = HEADLINE_LINE1.reduce((sum, part) => sum + part.text.length, 0)
const HEADLINE_LINE2_LENGTH = HEADLINE_LINE2.reduce((sum, part) => sum + part.text.length, 0)
const HEADLINE_TOTAL_LENGTH = HEADLINE_LINE1_LENGTH + HEADLINE_LINE2_LENGTH
const HEADLINE_FULL_TEXT = '다양한 경험을 하나의 서비스로 연결하는 개발자입니다'

const ORBIT_POSITIONS = [
  { top: '2%', left: '8%' },
  { top: '6%', right: '2%' },
  { bottom: '10%', left: '0%' },
  { bottom: '2%', right: '12%' },
]

const CIRCUIT_SVG = `
<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88' viewBox='0 0 88 88'>
  <g fill='none' stroke='rgba(61,90,254,0.22)' stroke-width='1.4'>
    <path d='M0 22 H26 V6 H52 V22 H88'/>
    <path d='M52 22 V44 H26 V66 H0'/>
    <path d='M52 44 H88'/>
    <path d='M26 66 V88'/>
    <path d='M70 44 V70 H44 V88'/>
  </g>
  <g fill='rgba(61,90,254,0.4)'>
    <circle cx='26' cy='22' r='2.4'/>
    <circle cx='52' cy='6' r='2.4'/>
    <circle cx='52' cy='22' r='2.4'/>
    <circle cx='52' cy='44' r='2.4'/>
    <circle cx='26' cy='44' r='2.4'/>
    <circle cx='26' cy='66' r='2.4'/>
    <circle cx='70' cy='44' r='2.4'/>
    <circle cx='70' cy='70' r='2.4'/>
    <circle cx='44' cy='70' r='2.4'/>
  </g>
</svg>
`.trim()

const CIRCUIT_BACKGROUND = `url("data:image/svg+xml,${encodeURIComponent(CIRCUIT_SVG)}")`

function HeroSection() {
  const { aboutMeData, homeData } = usePortfolio()
  const { name } = aboutMeData.basicInfo
  const orbitSkills = homeData.skills.slice(0, 4)
  const [typedLength, setTypedLength] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setTypedLength(HEADLINE_FULL_TEXT.length)
      return undefined
    }

    let current = 0
    const timer = setInterval(() => {
      current += 1
      setTypedLength(current)
      if (current >= HEADLINE_TOTAL_LENGTH) {
        clearInterval(timer)
      }
    }, 55)

    return () => clearInterval(timer)
  }, [])

  const renderTypedParts = (parts, lengthOffset, typedUpTo) => {
    let consumedLength = 0
    return parts.map((part, index) => {
      const start = consumedLength
      consumedLength += part.text.length
      const visibleText = part.text.slice(
        0,
        Math.max(0, Math.min(part.text.length, typedUpTo - lengthOffset - start)),
      )

      return part.gradient ? (
        <Box
          key={index}
          component="span"
          sx={{
            backgroundImage: 'linear-gradient(90deg, #3d5afe, #7c8cff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {visibleText}
        </Box>
      ) : (
        <Box key={index} component="span">
          {visibleText}
        </Box>
      )
    })
  }

  const isLine1Complete = typedLength >= HEADLINE_LINE1_LENGTH
  const typedLine1Parts = renderTypedParts(HEADLINE_LINE1, 0, typedLength)
  const typedLine2Parts = renderTypedParts(HEADLINE_LINE2, HEADLINE_LINE1_LENGTH, typedLength)

  const cursor = (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        width: '3px',
        height: '0.85em',
        ml: '3px',
        bgcolor: 'primary.main',
        verticalAlign: '-0.1em',
        animation: `${blink} 1s steps(1) infinite`,
      }}
    />
  )

  const scrollToAboutMe = () => {
    document.getElementById('home-about-me')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('home-contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(160deg, #eef1fb 0%, #f4f6fb 55%, #ffffff 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: CIRCUIT_BACKGROUND,
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, transparent 75%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: '50%',
          bgcolor: 'primary.light',
          filter: 'blur(70px)',
          opacity: 0.7,
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -80,
          width: 280,
          height: 280,
          borderRadius: '50%',
          bgcolor: alpha('#7c8cff', 0.35),
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 6, md: 4 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2.5} sx={{ textAlign: { xs: 'center', md: 'left' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Chip
                label={name}
                size="small"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  bgcolor: 'primary.main',
                  color: '#fff',
                  animation: `${fadeInUp} 0.6s ease-out both`,
                }}
              />

              <Typography
                variant="h3"
                component="h1"
                aria-label={HEADLINE_FULL_TEXT}
                sx={{
                  fontFamily: '"Pretendard Variable", Pretendard, system-ui, sans-serif',
                  fontWeight: 800,
                  fontSize: { xs: '1.75rem', md: '2.75rem' },
                  lineHeight: 1.3,
                  letterSpacing: '-0.5px',
                  maxWidth: 640,
                  minHeight: { xs: '4.7rem', md: '7.2rem' },
                  wordBreak: 'keep-all',
                  color: 'text.primary',
                }}
              >
                <Box component="span" aria-hidden="true">
                  <Box component="span">
                    {typedLine1Parts}
                    {!isLine1Complete && cursor}
                  </Box>
                  <br />
                  <Box component="span">
                    {typedLine2Parts}
                    {isLine1Complete && cursor}
                  </Box>
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: 'text.secondary',
                  maxWidth: 520,
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  wordBreak: 'keep-all',
                  animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
                }}
              >
                하나의 아이디어를 완성도 있는 결과로 만들어가는 과정을 즐기며, 배움을 실력으로 연결합니다.
              </Typography>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  mt: 1,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  animation: `${fadeInUp} 0.6s ease-out 0.3s both`,
                }}
              >
                <Button
                  component={RouterLink}
                  to="/projects"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: 6 },
                  }}
                >
                  프로젝트 보기
                </Button>
                <Button
                  onClick={scrollToContact}
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: 3 },
                  }}
                >
                  연락하기
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: 'relative',
                width: { xs: 240, md: 320 },
                height: { xs: 240, md: 320 },
                mx: 'auto',
                animation: `${fadeInUp} 0.7s ease-out 0.15s both`,
              }}
            >
              <Avatar
                role="img"
                aria-label="프로필 사진"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { xs: 108, md: 136 },
                  height: { xs: 108, md: 136 },
                  bgcolor: 'primary.light',
                  animation: `${pulseRing} 2.8s ease-out infinite`,
                }}
              >
                <PersonIcon sx={{ fontSize: { xs: '2.75rem', md: '3.5rem' }, color: 'primary.dark' }} aria-hidden="true" />
              </Avatar>

              {orbitSkills.map((skill, index) => {
                const color = categoryColors[skill.category] ?? '#3d5afe'
                const position = ORBIT_POSITIONS[index % ORBIT_POSITIONS.length]
                return (
                  <Box
                    key={skill.id}
                    title={skill.name}
                    sx={{
                      position: 'absolute',
                      ...position,
                      width: { xs: 44, md: 56 },
                      height: { xs: 44, md: 56 },
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'background.default',
                      boxShadow: 3,
                      animation: `${float} ${3 + index * 0.4}s ease-in-out ${index * 0.3}s infinite`,
                      transition: 'transform 0.2s ease',
                      '&:hover': { transform: 'scale(1.1)' },
                    }}
                  >
                    <SkillIcon icon={skill.icon} color={color} sx={{ fontSize: { xs: 20, md: 26 } }} />
                  </Box>
                )
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ position: 'relative', textAlign: 'center', mt: { xs: 5, md: 7 } }}>
        <IconButton
          onClick={scrollToAboutMe}
          aria-label="아래로 스크롤하여 About Me 보기"
          sx={{
            color: 'primary.main',
            animation: `${bounce} 1.8s ease-in-out infinite`,
          }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default HeroSection
