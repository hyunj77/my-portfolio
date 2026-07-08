import { useEffect, useMemo, useState } from 'react'
import { alpha, keyframes, useTheme } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import NearMeIcon from '@mui/icons-material/NearMe'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import SectionHeader from './SectionHeader.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'
import { supabase } from '../lib/supabase.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { brandTints, brandTintsDark } from '../theme.js'
import { useColorMode } from '../context/ColorModeContext.jsx'

const EMOJIS = ['👋', '😊', '🔥', '💪', '✨', '🚀', '🌟', '💡']
const MESSAGE_LIMIT = 500

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

const swirlSway = keyframes`
  0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
  50% { transform: translate(-20px, 16px) rotate(-1.4deg); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(var(--chip-rotate, 0deg)); }
  50% { transform: translateY(-10px) rotate(var(--chip-rotate, 0deg)); }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.18); }
`

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

function GuestbookSection() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [formOpen, setFormOpen] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0])
  const [name, setName] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [revealRef, isVisible] = useScrollReveal()
  const [error, setError] = useState('')
  const theme = useTheme()
  const { mode } = useColorMode()
  const tints = mode === 'dark' ? brandTintsDark : brandTints
  const ACCENTS = useMemo(
    () => [tints.accentBlueSoft, theme.palette.primary.main, tints.accentBlueMuted, theme.palette.text.primary],
    [tints, theme],
  )

  async function loadEntries() {
    if (!supabase) {
      setStatus('error')
      return
    }

    const { data, error: fetchError } = await supabase
      .from('portfolio_guestbook')
      .select('id, emoji, name, affiliation, message, created_at')
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error(fetchError)
      setStatus('error')
      return
    }
    setEntries(data ?? [])
    setStatus('ready')
  }

  useEffect(() => {
    loadEntries()
  }, [])

  const canSubmit =
    name.trim().length > 0 && message.trim().length > 0 && message.length <= MESSAGE_LIMIT && !submitting

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    setError('')

    if (!supabase) {
      setSubmitting(false)
      setError('방명록 등록에 실패했습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    const { error: insertError } = await supabase.from('portfolio_guestbook').insert({
      emoji: selectedEmoji,
      name: name.trim(),
      affiliation: affiliation.trim() || null,
      email: email.trim() || null,
      message: message.trim(),
    })

    setSubmitting(false)

    if (insertError) {
      console.error(insertError)
      setError('방명록 등록에 실패했습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    setName('')
    setAffiliation('')
    setEmail('')
    setMessage('')
    setSelectedEmoji(EMOJIS[0])
    setFormOpen(false)
    loadEntries()
  }

  return (
    <Box
      id="home-contact"
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 9 },
        // Hero는 wash → washSoft → default로 흐르는데, Contact는 반대 방향으로 흘러
        // 같은 팔레트를 공유하면서도 "다른 장면"처럼 보이게 한다.
        background: `linear-gradient(200deg, ${theme.palette.background.default} 0%, ${tints.washSoft} 55%, ${tints.wash} 100%)`,
        scrollMarginTop: 72,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '-18%',
          right: '-12%',
          width: { xs: 320, md: 480 },
          height: { xs: 320, md: 480 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.22)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
          filter: 'blur(10px)',
          animation: `${swirlSway} 24s ease-in-out infinite`,
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: '-22%',
          left: '-10%',
          width: { xs: 280, md: 420 },
          height: { xs: 280, md: 420 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(tints.accentLavender, 0.28)} 0%, ${alpha(tints.accentLavender, 0)} 70%)`,
          filter: 'blur(10px)',
          animation: `${swirlSway} 27s ease-in-out 1.2s infinite`,
          pointerEvents: 'none',
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: { sm: '8%' },
          left: { sm: '6%' },
          width: 52,
          height: 52,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
          bgcolor: 'background.paper',
          boxShadow: '0 12px 20px -8px rgba(20,24,43,0.28), 0 1px 2px rgba(20,24,43,0.08)',
          '--chip-rotate': '-8deg',
          animation: `${float} 3.6s ease-in-out infinite`,
        }}
      >
        <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 24, color: 'primary.main' }} />
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: { sm: '14%' },
          right: { sm: '8%' },
          width: 44,
          height: 44,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
          bgcolor: 'background.paper',
          boxShadow: '0 12px 20px -8px rgba(20,24,43,0.28), 0 1px 2px rgba(20,24,43,0.08)',
          '--chip-rotate': '10deg',
          animation: `${float} 4.1s ease-in-out 0.4s infinite`,
        }}
      >
        <FavoriteRoundedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: { sm: '10%' },
          right: { sm: '16%' },
          width: 48,
          height: 48,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
          bgcolor: 'background.paper',
          boxShadow: '0 12px 20px -8px rgba(20,24,43,0.28), 0 1px 2px rgba(20,24,43,0.08)',
          '--chip-rotate': '-6deg',
          animation: `${float} 3.9s ease-in-out 0.8s infinite`,
        }}
      >
        <NearMeIcon sx={{ fontSize: 22, color: 'primary.main', transform: 'rotate(-70deg)' }} />
      </Box>

      <Container
        ref={revealRef}
        maxWidth="md"
        sx={{
          position: 'relative',
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? `${fadeInUp} 0.6s ease-out both` : 'none',
        }}
      >
        <SectionHeader title="Contact" underlineColor={alpha(theme.palette.primary.main, 0.15)} animate={isVisible} />
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Stack direction="row" spacing={1.25} sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="h4" sx={{ fontSize: '1.8rem' }}>
              여기까지 와주셔서 반가워요
            </Typography>
            <Grow in={isVisible} timeout={700}>
              <Box
                aria-hidden="true"
                component="span"
                sx={{
                  display: 'inline-block',
                  fontSize: '1.9rem',
                  lineHeight: 1,
                  transformOrigin: '50% 50%',
                  animation: `${pulse} 1.1s ease-in-out 3 both`,
                }}
              >
                🫶
              </Box>
            </Grow>
          </Stack>
          <Typography sx={{ mt: 1, color: 'text.secondary' }}>
            새로운 인연과 프로젝트를 기다립니다. 방명록에 흔적을 남겨주세요!
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                p: 2.5,
                textAlign: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
                <EmailIcon fontSize="small" />
              </Avatar>
              <Typography variant="overline" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                EMAIL
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', wordBreak: 'break-all' }}>
                hyunj2727@gmail.com
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                p: 2.5,
                textAlign: 'center',
              }}
            >
              <Typography variant="overline" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                SOCIAL
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                <IconButton
                  component="a"
                  href="https://github.com/hyunj77"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                  aria-label="GitHub"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://hyunj77.github.io/my-portfolio/"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                  aria-label="포트폴리오 홈페이지"
                >
                  <LanguageIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="tel:01000000000"
                  sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                  aria-label="전화 010-0000-0000"
                >
                  <PhoneIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 7, mb: 4 }} />

        <SectionHeader title="Guestbook" underlineColor={alpha(theme.palette.primary.main, 0.15)} animate={isVisible} />
        <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>방명록에 흔적을 남겨주세요!</Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            mt: 3,
            mb: 3,
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Chip
            label={`${entries.length}개`}
            size="small"
            sx={{ bgcolor: alpha(theme.palette.primary.main, 0.15), color: 'primary.dark' }}
          />
          <Button variant="contained" startIcon={<EditIcon />} onClick={() => setFormOpen(true)}>
            방명록 남기기
          </Button>
        </Stack>

        {status === 'loading' && (
          <Box sx={{ py: 3 }}>
            <LoadingSpinner />
          </Box>
        )}
        {status === 'error' && (
          <Typography sx={{ color: 'text.secondary' }}>방명록을 불러오지 못했습니다.</Typography>
        )}
        {status === 'ready' && entries.length === 0 && (
          <Typography sx={{ color: 'text.secondary' }}>아직 방명록이 없어요. 첫 메시지를 남겨보세요!</Typography>
        )}

        {status === 'ready' && entries.length > 0 && (
          <Grid container spacing={2}>
            {entries.map((entry, i) => (
              <Grid key={entry.id} size={{ xs: 12, sm: 6 }}>
                <Grow in={isVisible} timeout={400 + i * 80}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    p: 2.5,
                    borderLeft: '4px solid',
                    borderLeftColor: ACCENTS[i % ACCENTS.length],
                  }}
                >
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 34, height: 34, fontSize: '0.95rem' }}>
                      {entry.emoji}
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', alignItems: 'baseline' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{entry.name}</Typography>
                        {entry.affiliation && (
                          <Typography variant="caption" color="text.secondary">
                            {entry.affiliation}
                          </Typography>
                        )}
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(entry.created_at)}
                      </Typography>
                      <Typography sx={{ mt: 1, wordBreak: 'break-word', fontSize: '0.9rem' }}>
                        {entry.message}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="xs" fullWidth>
        <IconButton
          onClick={() => setFormOpen(false)}
          aria-label="닫기"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <DialogContent component="form" onSubmit={handleSubmit} sx={{ pt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🖊️ 방명록 남기기
          </Typography>

          <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: 'text.secondary', mb: 1 }}>
            이모지 선택
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2.5 }}>
            {EMOJIS.map((emoji) => (
              <Box
                key={emoji}
                component="button"
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                aria-pressed={selectedEmoji === emoji}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 1.5,
                  fontSize: 17,
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: selectedEmoji === emoji ? 'primary.main' : 'divider',
                  bgcolor: selectedEmoji === emoji ? 'primary.light' : 'background.paper',
                }}
              >
                {emoji}
              </Box>
            ))}
          </Stack>

          <Stack spacing={1.5} sx={{ mb: 1.5 }}>
            <TextField
              label="이름 *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="소속/직업 (선택)"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              fullWidth
              size="small"
            />
          </Stack>

          <TextField
            type="email"
            label="이메일 (선택, 비공개)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
            helperText="이메일은 공개되지 않습니다"
            sx={{ mb: 1.5 }}
          />

          <TextField
            label="메시지 *"
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_LIMIT))}
            fullWidth
            required
            multiline
            minRows={4}
            helperText={`${message.length} / ${MESSAGE_LIMIT}`}
            sx={{ mb: error ? 1 : 2.5 }}
          />

          {error && (
            <Typography variant="body2" sx={{ color: 'error.main', mb: 1.5, fontWeight: 600 }}>
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth size="large" disabled={!canSubmit}>
            {submitting ? '등록 중...' : '방명록 남기기 ➤'}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default GuestbookSection
