import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'

// SVG stroke-dashoffset으로 채워지는 원형 스킬 레벨 표시. active가 true일 때만 채워진다.
function CircularSkillProgress({ value, color, size = 44, strokeWidth = 3, active, children }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - (active ? value : 0) / 100)

  return (
    <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <Box
        component="svg"
        width={size}
        height={size}
        sx={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
      >
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={alpha(color, 0.15)} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.9s ease-out' }}
        />
      </Box>
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </Box>
    </Box>
  )
}

export default CircularSkillProgress
