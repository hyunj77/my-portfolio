import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { alpha, keyframes, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonIcon from '@mui/icons-material/Person'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import NearMeIcon from '@mui/icons-material/NearMe'
import SkillIcon from './SkillIcon.jsx'
import RoleTypewriter from './RoleTypewriter.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { DEFAULT_SKILL_COLOR, categoryColors } from '../data/skillsData.js'
import { brandTints, brandTintsDark } from '../theme.js'
import { useParallax } from '../hooks/useParallax.js'
import { useColorMode } from '../context/ColorModeContext.jsx'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

// 모듈 스코프 keyframes라 라이브 테마를 못 받아서, 라이트/다크 어디서든 무난한
// 고정 블루 값을 그대로 쓴다 (아바타 주변 은은한 펄스 글로우라 큰 영향 없음).
const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 ${alpha('#4272f6', 0.35)}; }
  70% { box-shadow: 0 0 0 18px ${alpha('#4272f6', 0)}; }
  100% { box-shadow: 0 0 0 0 ${alpha('#4272f6', 0)}; }
`

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const swirlSwayA = keyframes`
  0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
  50% { transform: translate(22px, -14px) rotate(1.5deg); }
`

const swirlSwayB = keyframes`
  0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
  50% { transform: translate(-18px, 12px) rotate(-1.3deg); }
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


function HeroSection() {
  const { aboutMeData, homeData } = usePortfolio()
  const { name } = aboutMeData.basicInfo
  const orbitSkills = homeData.skills.slice(0, 4)
  const [typedLength, setTypedLength] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const bgParallaxRef = useParallax(0.12)
  const avatarParallaxRef = useParallax(-0.08)
  const { mode } = useColorMode()
  const tints = mode === 'dark' ? brandTintsDark : brandTints

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
            backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${tints.accentBlue})`,
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
      id="hero"
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 6, sm: 8, md: 10 },
        pb: { xs: 3, sm: 4, md: 4 },
        minHeight: { md: '94svh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: `linear-gradient(160deg, ${tints.wash} 0%, ${tints.washSoft} 55%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Box
        ref={bgParallaxRef}
        aria-hidden="true"
        component="svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          filter: 'blur(20px)',
          transform: 'translate3d(0, calc(var(--parallax-y, 0) * 1px), 0)',
          willChange: 'transform',
        }}
      >
        <defs>
          <linearGradient id="heroSwirlA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity="0.45" />
            <stop offset="55%" stopColor={tints.accentBlueSoft} stopOpacity="0.3" />
            <stop offset="100%" stopColor={tints.accentLavender} stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="heroSwirlB" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={tints.accentLavender} stopOpacity="0.35" />
            <stop offset="100%" stopColor={tints.wash} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <Box
          component="g"
          sx={{ transformBox: 'fill-box', transformOrigin: '50% 50%', animation: `${swirlSwayA} 19s ease-in-out infinite` }}
        >
          <path
            d="M -80 460 C 140 260, 300 540, 500 320 C 660 150, 800 260, 920 90"
            fill="none"
            stroke="url(#heroSwirlA)"
            strokeWidth="130"
            strokeLinecap="round"
          />
        </Box>
        <Box
          component="g"
          sx={{ transformBox: 'fill-box', transformOrigin: '50% 50%', animation: `${swirlSwayB} 23s ease-in-out infinite 1.5s` }}
        >
          <path
            d="M -60 340 C 160 160, 320 420, 540 220 C 680 100, 780 170, 900 40"
            fill="none"
            stroke="url(#heroSwirlB)"
            strokeWidth="70"
            strokeLinecap="round"
          />
        </Box>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          px: { xs: 3, sm: 4 },
          display: 'flex',
          alignItems: 'center',
          flexGrow: { md: 1 },
        }}
      >
        <Grid container spacing={{ xs: 5, sm: 6, md: 4 }} sx={{ alignItems: 'center', width: '100%' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={{ xs: 2, sm: 2.5 }} sx={{ textAlign: { xs: 'center', md: 'left' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Box
                sx={{
                  fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.3rem' },
                  animation: `${fadeInUp} 0.6s ease-out both`,
                }}
              >
                <RoleTypewriter />
              </Box>

              <Typography
                variant="h3"
                component="h1"
                aria-label={HEADLINE_FULL_TEXT}
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.7rem', lg: '3.1rem' },
                  lineHeight: 1.35,
                  letterSpacing: '-0.5px',
                  maxWidth: 700,
                  minHeight: { xs: '4.1rem', sm: '5.6rem', md: '7.3rem', lg: '8.4rem' },
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
                  maxWidth: 560,
                  fontSize: { xs: '0.9rem', sm: '0.98rem', md: '1.15rem' },
                  lineHeight: 1.7,
                  wordBreak: 'keep-all',
                  animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
                }}
              >
                하나의 아이디어를 완성도 있는 결과로 만들어가는 과정을 즐기며, 작은 디테일 하나까지 놓치지 않으려 합니다.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{
                  mt: 1,
                  width: { xs: '100%', sm: 'auto' },
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
                  fullWidth={isMobile}
                  sx={{ minHeight: 44 }}
                >
                  프로젝트 보기
                </Button>
                <Button
                  onClick={scrollToContact}
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth={isMobile}
                  sx={{ minHeight: 44 }}
                >
                  연락하기
                </Button>
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  mt: 0.5,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  animation: `${fadeInUp} 0.6s ease-out 0.4s both`,
                }}
              >
                <IconButton
                  component="a"
                  href="https://github.com/hyunj77"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)', bgcolor: 'primary.main', color: '#fff' },
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)', bgcolor: 'primary.main', color: '#fff' },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="mailto:hyunj2727@gmail.com"
                  aria-label="이메일"
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)', bgcolor: 'primary.main', color: '#fff' },
                  }}
                >
                  <EmailIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              ref={avatarParallaxRef}
              sx={{
                transform: 'translate3d(0, calc(var(--parallax-y, 0) * 1px), 0)',
                willChange: 'transform',
              }}
            >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 220, sm: 280, md: 320 },
                height: { xs: 220, sm: 280, md: 320 },
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
                  width: { xs: 96, sm: 120, md: 136 },
                  height: { xs: 96, sm: 120, md: 136 },
                  bgcolor: 'primary.light',
                  animation: `${pulseRing} 2.8s ease-out infinite`,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.3 }}>
                  <PersonIcon sx={{ fontSize: { xs: '1.9rem', sm: '2.3rem', md: '2.6rem' }, color: 'primary.dark' }} aria-hidden="true" />
                  <Typography
                    sx={{
                      fontSize: { xs: '0.6rem', sm: '0.68rem', md: '0.75rem' },
                      fontWeight: 700,
                      color: 'primary.dark',
                      whiteSpace: 'nowrap',
                      lineHeight: 1,
                    }}
                  >
                    {name}
                  </Typography>
                </Box>
              </Avatar>

              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  top: { xs: '42%', md: '46%' },
                  left: { xs: '-22%', md: '-42%' },
                  width: { xs: 90, md: 130 },
                  height: { xs: 90, md: 130 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <NearMeIcon
                  sx={{
                    fontSize: { xs: 56, md: 78 },
                    color: 'primary.main',
                    transform: 'rotate(-70deg)',
                    filter: `drop-shadow(0 6px 16px ${alpha(theme.palette.primary.main, 0.35)})`,
                    transition: 'color 0.35s ease, filter 0.35s ease, transform 0.35s ease',
                    '&:hover': {
                      color: 'primary.dark',
                      transform: 'rotate(-70deg) scale(1.08)',
                      filter: [
                        `drop-shadow(0 0 10px ${alpha(theme.palette.primary.main, 0.85)})`,
                        `drop-shadow(0 0 28px ${alpha(tints.accentBlueSoft, 0.65)})`,
                        `drop-shadow(0 0 52px ${alpha(tints.accentLavender, 0.45)})`,
                      ].join(' '),
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: '2%', md: '4%' },
                  right: { xs: '-8%', md: '-14%' },
                  width: { xs: 96, sm: 110, md: 128 },
                  height: { xs: 96, sm: 110, md: 128 },
                }}
              >
                {orbitSkills.map((skill, index) => {
                  const color = categoryColors[skill.category] ?? DEFAULT_SKILL_COLOR
                  const stackPositions = [
                    { top: 0, left: 0 },
                    { top: '18%', left: '32%' },
                    { top: '38%', left: '4%' },
                    { top: '54%', left: '38%' },
                  ]
                  const rotations = [-9, 6, -5, 11]
                  const stackPos = stackPositions[index % stackPositions.length]
                  const rotate = rotations[index % rotations.length]
                  return (
                    <Box
                      key={skill.id}
                      title={skill.name}
                      sx={{
                        position: 'absolute',
                        ...stackPos,
                        zIndex: index,
                        transform: `rotate(${rotate}deg)`,
                        transition: 'transform 0.25s ease',
                        '&:hover': { transform: 'rotate(0deg) scale(1.1)', zIndex: 10 },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 42, sm: 46, md: 52 },
                          height: { xs: 42, sm: 46, md: 52 },
                          borderRadius: '20%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'background.paper',
                          boxShadow: '0 12px 20px -8px rgba(20,24,43,0.28), 0 1px 2px rgba(20,24,43,0.08)',
                          animation: `${float} ${3.4 + index * 0.3}s ease-in-out ${index * 0.25}s infinite`,
                        }}
                      >
                        <SkillIcon icon={skill.icon} color={color} sx={{ fontSize: { xs: 18, md: 22 } }} />
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ position: 'relative', textAlign: 'center', mt: { xs: 3, md: 4 } }}>
        <IconButton
          onClick={scrollToAboutMe}
          aria-label="아래로 스크롤하여 About Me 보기"
          sx={{
            width: 44,
            height: 44,
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
