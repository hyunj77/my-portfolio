import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import SectionHeader from './SectionHeader.jsx'

const SKILLS = [
  { name: 'React', level: 0 },
  { name: 'JavaScript', level: 0 },
  { name: 'UI / UX', level: 0 },
]

function SkillTreeSection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="sm">
        <SectionHeader title="Skill Tree" />
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 1.5 }}>
          여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
          {SKILLS.map((skill) => (
            <Box key={skill.name}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontWeight: 600 }}>{skill.name}</Typography>
                <Typography color="text.secondary">{skill.level}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={skill.level}
                sx={{
                  height: 10,
                  borderRadius: 999,
                  bgcolor: 'primary.light',
                  '& .MuiLinearProgress-bar': { borderRadius: 999 },
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default SkillTreeSection
