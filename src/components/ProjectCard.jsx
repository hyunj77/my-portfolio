import { useState } from 'react'
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

function repoUrlFromDetailUrl(detailUrl) {
  const repoName = detailUrl?.replace(/\/$/, '').split('/').pop()
  return repoName ? `https://github.com/hyunj77/${repoName}` : 'https://github.com/hyunj77'
}

function TechBadges({ techStack }) {
  if (!techStack?.length) return null
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1, my: 1.5 }}>
      {techStack.map((tech) => (
        <Chip
          key={tech}
          label={tech}
          size="small"
          sx={{ bgcolor: 'rgba(61,90,254,0.12)', color: 'primary.dark', fontWeight: 600 }}
        />
      ))}
    </Stack>
  )
}

function ProjectCard({ project }) {
  const { title, description, tech_stack: techStack, detail_url: detailUrl, thumbnail_url: thumbnailUrl } = project
  const [showDetails, setShowDetails] = useState(false)
  const githubUrl = repoUrlFromDetailUrl(detailUrl)

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea onClick={() => setShowDetails(true)} aria-label={`${title} 상세보기`}>
        <CardMedia
          component="img"
          image={thumbnailUrl}
          alt={`${title} 메인 화면`}
          loading="lazy"
          decoding="async"
          sx={{ aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'top', bgcolor: 'primary.light' }}
        />
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
