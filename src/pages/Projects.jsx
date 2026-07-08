import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import SectionHeader from '../components/SectionHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { supabase } from '../lib/supabase.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const SKELETON_COUNT = 3

function ProjectCardSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" sx={{ aspectRatio: '1 / 1', width: '100%' }} />
      <Skeleton variant="text" sx={{ fontSize: '1.15rem', mt: 1.5 }} width="55%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="rounded" width={80} height={24} sx={{ mt: 1, borderRadius: 999 }} />
    </Box>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')
  const count = useCountUp(projects.length, { start: status === 'ready', duration: 1000 })
  const [revealRef, isVisible] = useScrollReveal()

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
      <Container ref={revealRef} maxWidth="md">
        <SectionHeader title="Projects" animate={isVisible} />
        {status === 'ready' && projects.length > 0 && (
          <Typography sx={{ textAlign: 'center', mt: 1, color: 'text.secondary' }}>
            총{' '}
            <Box component="span" sx={{ fontWeight: 800, color: 'primary.main', fontVariantNumeric: 'tabular-nums' }}>
              {count}
            </Box>
            개의 프로젝트
          </Typography>
        )}

        {status === 'loading' && (
          <Grid container spacing={{ xs: 2.5, sm: 3 }} sx={{ mt: 4 }}>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCardSkeleton />
              </Grid>
            ))}
          </Grid>
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
                <Grow in={isVisible} timeout={400 + index * 100}>
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
