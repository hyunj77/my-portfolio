import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { supabase } from '../lib/supabase.js'

const EMOJIS = ['👋', '😊', '🔥', '💪', '✨', '🚀', '🌟', '💡']
const MESSAGE_LIMIT = 500
const ACCENTS = ['#8fa6ff', '#3d5afe', '#6b85ff', '#1b2a56']

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
  const [error, setError] = useState('')

  async function loadEntries() {
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
    <Box id="home-contact" component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper', scrollMarginTop: 72 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Chip
            label="Contact"
            size="small"
            sx={{ mb: 1.5, fontWeight: 700, bgcolor: 'rgba(61,90,254,0.15)', color: 'primary.dark' }}
          />
          <Typography variant="h4" sx={{ fontSize: '1.8rem' }}>
            여기까지 와주셔서 반가워요 🌱
          </Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary' }}>
            새로운 인연과 프로젝트를 기다립니다. 방명록에 흔적을 남겨주세요!
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 2.5, textAlign: 'center' }}>
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
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 2.5, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
                <LocationOnIcon fontSize="small" />
              </Avatar>
              <Typography variant="overline" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                LOCATION
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>Busan, South Korea</Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 2.5, textAlign: 'center' }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                SOCIAL
              </Typography>
              <Stack direction="row" spacing={1}>
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
                  href="mailto:hyunj2727@gmail.com"
                  sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                  aria-label="Email"
                >
                  <EmailIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            mt: 7,
            mb: 3,
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography variant="h6">방명록</Typography>
            <Chip label={`${entries.length}개`} size="small" sx={{ bgcolor: 'primary.light', color: 'primary.dark' }} />
          </Stack>
          <Button variant="contained" startIcon={<EditIcon />} onClick={() => setFormOpen(true)}>
            방명록 남기기
          </Button>
        </Stack>

        {status === 'loading' && (
          <Typography sx={{ color: 'text.secondary' }}>불러오는 중...</Typography>
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
