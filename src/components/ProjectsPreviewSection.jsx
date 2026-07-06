import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { keyframes } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import Typography from '@mui/material/Typography'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import SectionHeader from './SectionHeader.jsx'
import { supabase } from '../lib/supabase.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

function ProjectsPreviewSection() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')
  const [revealRef, isVisible] = useScrollReveal()

  useEffect(() => {
    let cancelled = false

    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, thumbnail_url, detail_url')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .limit(3)

      if (cancelled) return

      if (error) {
        console.error(error)
        setStatus('error')
        return
      }

      setProjects(data ?? [])
      setStatus('ready')
    }

    fetchProjects()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container
        ref={revealRef}
        maxWidth="md"
        sx={{ opacity: isVisible ? 1 : 0, animation: isVisible ? `${fadeInUp} 0.6s ease-out both` : 'none' }}
      >
        <SectionHeader title="Projects" />

        {status === 'ready' && projects.length > 0 && (
          <Grid container spacing={{ xs: 2, sm: 2.5 }} sx={{ mt: 4, mb: 4 }}>
            {projects.map((project, index) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Grow in={isVisible} timeout={400 + index * 100}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardActionArea
                      href={project.detail_url}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                    >
                      <CardMedia
                        component="img"
                        image={project.thumbnail_url}
                        alt={`${project.title} 메인 화면`}
                        sx={{ aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top', bgcolor: 'primary.light' }}
                      />
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {project.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={RouterLink}
            to="/projects"
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardRoundedIcon />}
          >
            전체 프로젝트 더 보기
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ProjectsPreviewSection
