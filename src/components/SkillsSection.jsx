import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import LinearProgress from '@mui/material/LinearProgress'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import SectionHeader from './SectionHeader.jsx'
import SkillIcon from './SkillIcon.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { availableSkillsCatalog, categoryColors, categoryOrder } from '../data/skillsData.js'

const AnimatedLevelBar = memo(function AnimatedLevelBar({ level, color }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(0)
    const frame = requestAnimationFrame(() => setValue(level))
    return () => cancelAnimationFrame(frame)
  }, [level])

  return (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 8,
        borderRadius: 999,
        bgcolor: alpha(color, 0.15),
        '& .MuiLinearProgress-bar': {
          borderRadius: 999,
          bgcolor: color,
          transition: 'transform 0.9s ease-out',
        },
      }}
    />
  )
})

const SkillCard = memo(function SkillCard({ skill, editable, onLevelChange }) {
  const color = categoryColors[skill.category] ?? '#3d5afe'

  return (
    <Tooltip title={skill.description} arrow placement="top">
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          p: 2.5,
          bgcolor: 'background.paper',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: skill.level != null ? 2 : 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: '50%',
              bgcolor: alpha(color, 0.12),
              flexShrink: 0,
            }}
          >
            <SkillIcon icon={skill.icon} color={color} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, color: 'text.primary' }} noWrap>
              {skill.name}
            </Typography>
            {skill.level == null && (
              <Chip label="사용 툴" size="small" sx={{ mt: 0.5, bgcolor: alpha(color, 0.12), color }} />
            )}
          </Box>
        </Box>

        {skill.level != null && (
          editable ? (
            <Box sx={{ px: 0.5 }}>
              <Slider
                size="small"
                value={skill.level}
                onChange={(event, value) => onLevelChange(skill.id, value)}
                valueLabelDisplay="auto"
                aria-label={`${skill.name} 숙련도`}
                sx={{ color }}
              />
            </Box>
          ) : (
            <>
              <AnimatedLevelBar level={skill.level} color={color} />
              <Typography sx={{ mt: 0.75, textAlign: 'right', fontSize: '0.85rem', color: 'text.secondary' }}>
                {skill.level}%
              </Typography>
            </>
          )
        )}
      </Card>
    </Tooltip>
  )
})

function SkillsSection({ editable = false }) {
  const { aboutMeData, updateSkillLevel, addSkill } = usePortfolio()
  const skills = aboutMeData.skills
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)

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

  const addableSkills = useMemo(() => {
    const existingNames = new Set(skills.map((skill) => skill.name))
    return availableSkillsCatalog.filter((skill) => !existingNames.has(skill.name))
  }, [skills])

  const handleOpenMenu = useCallback((event) => setAnchorEl(event.currentTarget), [])
  const handleCloseMenu = useCallback(() => setAnchorEl(null), [])

  const handleAddSkill = useCallback(
    (catalogSkill) => {
      addSkill({
        icon: catalogSkill.icon,
        name: catalogSkill.name,
        level: 50,
        category: catalogSkill.category,
        description: catalogSkill.description,
      })
      setAnchorEl(null)
    },
    [addSkill],
  )

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 2, md: 0 } }}>
        <SectionHeader title="기술 스택" />

        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {groupedSkills.map(({ category, items }) => (
            <Box key={category}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: categoryColors[category] ?? '#3d5afe',
                  }}
                />
                <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>{category}</Typography>
              </Box>
              <Grid container spacing={2.5}>
                {items.map((skill) => (
                  <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Grow in timeout={400}>
                      <Box sx={{ height: '100%' }}>
                        <SkillCard skill={skill} editable={editable} onLevelChange={updateSkillLevel} />
                      </Box>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>

        {editable && (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              disabled={addableSkills.length === 0}
              onClick={handleOpenMenu}
            >
              {addableSkills.length === 0 ? '모든 스킬 추가 완료' : '스킬 추가'}
            </Button>
            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
              {addableSkills.map((catalogSkill) => (
                <MenuItem key={catalogSkill.name} onClick={() => handleAddSkill(catalogSkill)}>
                  <SkillIcon icon={catalogSkill.icon} color={categoryColors[catalogSkill.category] ?? '#3d5afe'} />
                  <Typography sx={{ ml: 1.5 }}>{catalogSkill.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(SkillsSection)
