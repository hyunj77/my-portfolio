import { memo, useMemo } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import LinearProgress from '@mui/material/LinearProgress'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import SectionHeader from './SectionHeader.jsx'
import SkillIcon from './SkillIcon.jsx'
import CircularSkillProgress from './CircularSkillProgress.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { DEFAULT_SKILL_COLOR, categoryColors, categoryOrder } from '../data/skillsData.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useCountUp } from '../hooks/useCountUp.js'

const AnimatedLevelBar = memo(function AnimatedLevelBar({ level, color, active }) {
  const count = useCountUp(level, { start: active, duration: 900 })

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={active ? count : 0}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: alpha(color, 0.15),
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
            bgcolor: color,
            transition: 'transform 0.2s linear',
          },
        }}
      />
      <Typography
        sx={{ mt: 0.75, textAlign: 'right', fontSize: '0.85rem', color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}
      >
        {count}%
      </Typography>
    </>
  )
})

const SkillCard = memo(function SkillCard({ skill, active }) {
  const color = categoryColors[skill.category] ?? DEFAULT_SKILL_COLOR

  return (
    <Tooltip title={skill.description} arrow placement="top">
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          p: 2.5,
          bgcolor: 'background.paper',
          willChange: 'transform',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '@media (hover: hover)': {
            '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 16px 32px -12px ${alpha(color, 0.45)}` },
            '&:hover .skill-icon-circle': {
              transform: 'rotate(12deg) scale(1.12)',
              boxShadow: `0 0 0 6px ${alpha(color, 0.16)}, 0 0 18px ${alpha(color, 0.55)}`,
            },
          },
          '&:focus-within': { transform: 'translateY(-6px)', boxShadow: `0 16px 32px -12px ${alpha(color, 0.45)}` },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: skill.level != null ? 2 : 0 }}>
          {skill.level != null ? (
            <CircularSkillProgress value={skill.level} color={color} size={44} active={active}>
              <Box
                className="skill-icon-circle"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: alpha(color, 0.12),
                  willChange: 'transform, box-shadow',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <SkillIcon icon={skill.icon} color={color} sx={{ fontSize: 18 }} />
              </Box>
            </CircularSkillProgress>
          ) : (
            <Box
              className="skill-icon-circle"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '50%',
                bgcolor: alpha(color, 0.12),
                flexShrink: 0,
                willChange: 'transform, box-shadow',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <SkillIcon icon={skill.icon} color={color} />
            </Box>
          )}
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, color: 'text.primary' }} noWrap>
              {skill.name}
            </Typography>
            {skill.level == null && (
              <Chip label="사용 툴" size="small" sx={{ mt: 0.5, bgcolor: alpha(color, 0.12), color }} />
            )}
          </Box>
        </Box>

        {skill.level != null && <AnimatedLevelBar level={skill.level} color={color} active={active} />}
      </Card>
    </Tooltip>
  )
})

function SkillsSection() {
  const { aboutMeData } = usePortfolio()
  const skills = aboutMeData.skills
  const [revealRef, isVisible] = useScrollReveal()

  const groupedSkills = useMemo(() => {
    const groups = skills.reduce((acc, skill) => {
      acc[skill.category] = acc[skill.category] ?? []
      acc[skill.category].push(skill)
      return acc
    }, {})
    const orderedCategories = [
      ...categoryOrder.filter((category) => groups[category]),
      ...Object.keys(groups).filter((category) => !categoryOrder.includes(category)),
    ]
    return orderedCategories.map((category) => ({ category, items: groups[category] }))
  }, [skills])

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Box ref={revealRef} sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 2, md: 0 } }}>
        <SectionHeader title="Skills" animate={isVisible} />

        <Box sx={{ mt: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 5 } }}>
          {groupedSkills.map(({ category, items }) => (
            <Box key={category}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: categoryColors[category] ?? DEFAULT_SKILL_COLOR,
                  }}
                />
                <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>{category}</Typography>
              </Box>
              <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                {items.map((skill, index) => (
                  <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Grow in={isVisible} timeout={400 + index * 80}>
                      <Box sx={{ height: '100%' }}>
                        <SkillCard skill={skill} active={isVisible} />
                      </Box>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(SkillsSection)
