import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import Typography from '@mui/material/Typography'
import SectionHeader from '../components/SectionHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { supabase } from '../lib/supabase.js'

function Projects() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })

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
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <SectionHeader title="Projects" />

        {status === 'loading' && (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>불러오는 중...</Typography>
        )}
        {status === 'error' && (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
            프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </Typography>
        )}
        {status === 'ready' && projects.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>등록된 프로젝트가 없습니다.</Typography>
        )}

        {status === 'ready' && projects.length > 0 && (
          <Grid container spacing={{ xs: 2.5, sm: 3 }} sx={{ mt: 4 }}>
            {projects.map((project, index) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Grow in timeout={400 + index * 100}>
                  <Box sx={{ height: '100%' }}>
                    <ProjectCard project={project} />
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default Projects
