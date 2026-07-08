import { useState } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { useColorMode } from '../context/ColorModeContext.jsx'
import { DEFAULT_SKILL_COLOR, DEFAULT_SKILL_COLOR_DARK } from '../data/skillsData.js'
import { resolveThumbnailUrl } from '../data/thumbnailOverrides.js'

function repoUrlFromDetailUrl(detailUrl) {
  const repoName = detailUrl?.replace(/\/$/, '').split('/').pop()
  return repoName ? `https://github.com/hyunj77/${repoName}` : 'https://github.com/hyunj77'
}

function TechBadges({ techStack }) {
  const { mode } = useColorMode()
  const color = mode === 'dark' ? DEFAULT_SKILL_COLOR_DARK : DEFAULT_SKILL_COLOR
  if (!techStack?.length) return null
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1, my: 1.5 }}>
      {techStack.map((tech) => (
        <Chip
          key={tech}
          label={tech}
          size="small"
          sx={{ bgcolor: alpha(color, 0.12), color: 'primary.dark', fontWeight: 600 }}
        />
      ))}
    </Stack>
  )
}

function ProjectCard({ project }) {
  const { title, description, tech_stack: techStack, detail_url: detailUrl } = project
  const [showDetails, setShowDetails] = useState(false)
  const githubUrl = repoUrlFromDetailUrl(detailUrl)
  const thumbnailUrl = resolveThumbnailUrl(project)

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        willChange: 'transform',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '@media (hover: hover)': {
          '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 40px -18px rgba(32,36,43,0.35)' },
        },
        '&:focus-within': { transform: 'translateY(-6px)', boxShadow: '0 20px 40px -18px rgba(32,36,43,0.35)' },
      }}
    >
      <CardActionArea
        onClick={() => setShowDetails(true)}
        aria-label={`${title} 상세보기`}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          '@media (hover: hover)': {
            '&:hover .project-thumb': { transform: 'scale(1.08)', filter: 'brightness(0.85) saturate(1.1)' },
            '&:hover .project-overlay': { opacity: 1 },
          },
          '&.Mui-focusVisible .project-thumb': { transform: 'scale(1.08)', filter: 'brightness(0.85) saturate(1.1)' },
          '&.Mui-focusVisible .project-overlay': { opacity: 1 },
        }}
      >
        <CardMedia
          component="img"
          className="project-thumb"
          image={thumbnailUrl}
          alt={`${title} 메인 화면`}
          loading="lazy"
          decoding="async"
          sx={{
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            objectPosition: 'top',
            bgcolor: 'primary.light',
            willChange: 'transform, filter',
            transition: 'transform 0.4s ease, filter 0.4s ease',
          }}
        />
        <Box
          className="project-overlay"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            p: 2,
            background: 'linear-gradient(180deg, transparent 45%, rgba(20,24,43,0.78) 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>자세히 보기 →</Typography>
        </Box>
      </CardActionArea>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontSize: '1.15rem' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
        <TechBadges techStack={techStack} />
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1, mt: 'auto', pt: 1 }}>
          <Button href={detailUrl} target="_blank" rel="noreferrer" variant="contained" size="small">
            Live Demo
          </Button>
          <Button href={githubUrl} target="_blank" rel="noreferrer" variant="outlined" color="inherit" size="small">
            GitHub
          </Button>
          <Button variant="outlined" size="small" onClick={() => setShowDetails(true)}>
            View Details
          </Button>
        </Stack>
      </CardContent>

      <Dialog open={showDetails} onClose={() => setShowDetails(false)} maxWidth="sm" fullWidth>
        <Box
          component="img"
          src={thumbnailUrl}
          alt={`${title} 메인 화면`}
          sx={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top', bgcolor: 'primary.light' }}
        />
        <IconButton
          onClick={() => setShowDetails(false)}
          aria-label="닫기"
          sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
          <TechBadges techStack={techStack} />
          <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
            <Button href={detailUrl} target="_blank" rel="noreferrer" variant="contained" size="small">
              Live Demo
            </Button>
            <Button href={githubUrl} target="_blank" rel="noreferrer" variant="outlined" color="inherit" size="small">
              GitHub
            </Button>
          </Stack>
        </CardContent>
      </Dialog>
    </Card>
  )
}

export default ProjectCard
