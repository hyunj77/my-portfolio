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
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import SectionHeader from './SectionHeader.jsx'
import { supabase } from '../lib/supabase.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { resolveThumbnailUrl } from '../data/thumbnailOverrides.js'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

const SKELETON_COUNT = 3

function ProjectPreviewSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" sx={{ aspectRatio: '16 / 10', width: '100%' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', mt: 1.5 }} width="50%" />
      <Skeleton variant="text" width="85%" />
    </Box>
  )
}

function ProjectsPreviewSection() {
  const [projects, setProjects] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [status, setStatus] = useState('loading')
  const [revealRef, isVisible] = useScrollReveal()
  const count = useCountUp(totalCount, { start: isVisible && status === 'ready', duration: 1000 })

  useEffect(() => {
    let cancelled = false

    async function fetchProjects() {
      const { data, error, count: fetchedCount } = await supabase
        .from('projects')
        .select('id, title, description, thumbnail_url, detail_url', { count: 'exact' })
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
      setTotalCount(fetchedCount ?? data?.length ?? 0)
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
        <SectionHeader title="Projects" animate={isVisible} />
        {status === 'ready' && totalCount > 0 && (
          <Typography sx={{ textAlign: 'center', mt: 1, color: 'text.secondary' }}>
            총{' '}
            <Box component="span" sx={{ fontWeight: 800, color: 'primary.main', fontVariantNumeric: 'tabular-nums' }}>
              {count}
            </Box>
            개의 프로젝트
          </Typography>
        )}

        {status === 'loading' && (
          <Grid container spacing={{ xs: 2, sm: 2.5 }} sx={{ mt: 4, mb: 4 }}>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectPreviewSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {status === 'ready' && projects.length > 0 && (
          <Grid container spacing={{ xs: 2, sm: 2.5 }} sx={{ mt: 4, mb: 4 }}>
            {projects.map((project, index) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Grow in={isVisible} timeout={400 + index * 100}>
                  <Card
                    variant="outlined"
                    sx={{
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
                      href={project.detail_url}
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        '@media (hover: hover)': {
                          '&:hover .project-thumb': { transform: 'scale(1.08)', filter: 'brightness(0.85) saturate(1.1)' },
                          '&:hover .project-overlay': { opacity: 1 },
                        },
                        '&.Mui-focusVisible .project-thumb': { transform: 'scale(1.08)', filter: 'brightness(0.85) saturate(1.1)' },
                        '&.Mui-focusVisible .project-overlay': { opacity: 1 },
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          className="project-thumb"
                          image={resolveThumbnailUrl(project)}
                          alt={`${project.title} 메인 화면`}
                          sx={{
                            aspectRatio: '16 / 10',
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
                          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>자세히 보기 →</Typography>
                        </Box>
                      </Box>
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
