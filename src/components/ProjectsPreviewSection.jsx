import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SectionHeader from './SectionHeader.jsx'
import { supabase } from '../lib/supabase.js'

function ProjectsPreviewSection() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')

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
      <Container maxWidth="md">
        <SectionHeader title="Projects" />

        {status === 'ready' && projects.length > 0 && (
          <Grid container spacing={2.5} sx={{ mb: 4 }}>
            {projects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: 'center' }}>
          <Button component={RouterLink} to="/projects" variant="outlined" color="primary">
            전체 프로젝트 더 보기 →
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ProjectsPreviewSection
