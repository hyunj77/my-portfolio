import { Link as RouterLink } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SectionHeader from './SectionHeader.jsx'
import SkillIcon from './SkillIcon.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { categoryColors } from '../data/skillsData.js'

function SkillTreeSection() {
  const { homeData } = usePortfolio()

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="sm">
        <SectionHeader title="Skills" />
        <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={3} sx={{ mt: 4 }}>
          {homeData.skills.map((skill) => {
            const color = categoryColors[skill.category] ?? '#3d5afe'
            return (
              <Stack key={skill.id} alignItems="center" spacing={1} sx={{ width: 84 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(color, 0.12),
                  }}
                >
                  <SkillIcon icon={skill.icon} color={color} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'center' }}>
                  {skill.name}
                </Typography>
              </Stack>
            )
          })}
        </Stack>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button component={RouterLink} to="/about" variant="outlined" color="primary">
            전체 스킬 보기
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default SkillTreeSection
