import { Component } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          role="alert"
          sx={{
            textAlign: 'center',
            py: 10,
            px: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            문제가 발생했습니다
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            페이지를 표시하는 중 오류가 발생했습니다. 새로고침해 주세요.
          </Typography>
          <Button variant="outlined" color="primary" onClick={() => window.location.reload()}>
            새로고침
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
