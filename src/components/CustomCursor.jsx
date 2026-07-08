import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

const MAGNETIC_SELECTOR = 'a, button, [role="button"]'
const MAGNETIC_PULL = 0.15
const FOLLOW_EASE = 0.42
const TRAIL_LENGTH = 3

// 네이티브 커서는 그대로 두고, 그 옆에 </> 아이콘이 은은하게 따라붙는다.
// 위치 이동(매 프레임, JS transform)과 호버 모핑(회전/확대, CSS transition)을
// 서로 다른 DOM 노드에 나눠서 애니메이션이 서로 충돌하지 않게 한다.
function CustomCursor() {
  const posRef = useRef(null)
  const iconRef = useRef(null)
  const trailRefs = useRef([])

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || prefersReducedMotion) return undefined

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const cursor = { x: mouse.x, y: mouse.y }
    const trailPositions = Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouse.x, y: mouse.y }))
    let hoveredTarget = null
    let frameId

    function handleMouseMove(event) {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    function handleOver(event) {
      const target = event.target.closest?.(MAGNETIC_SELECTOR)
      if (target) {
        hoveredTarget = target
        iconRef.current?.classList.add('cursor-hover')
      }
    }

    function handleOut(event) {
      const target = event.target.closest?.(MAGNETIC_SELECTOR)
      if (target && target === hoveredTarget) {
        hoveredTarget = null
        iconRef.current?.classList.remove('cursor-hover')
      }
    }

    function tick() {
      // 버튼 근처에서는 살짝만(15%) 중심 쪽으로 끌리게 해서, 실제 커서 위치와
      // 크게 어긋나지 않으면서도 은은한 자석 느낌만 낸다.
      let targetX = mouse.x
      let targetY = mouse.y
      if (hoveredTarget?.isConnected) {
        const rect = hoveredTarget.getBoundingClientRect()
        targetX = mouse.x + (rect.left + rect.width / 2 - mouse.x) * MAGNETIC_PULL
        targetY = mouse.y + (rect.top + rect.height / 2 - mouse.y) * MAGNETIC_PULL
      }

      cursor.x += (targetX - cursor.x) * FOLLOW_EASE
      cursor.y += (targetY - cursor.y) * FOLLOW_EASE

      if (posRef.current) {
        posRef.current.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)`
      }

      trailPositions.pop()
      trailPositions.unshift({ x: cursor.x, y: cursor.y })
      trailRefs.current.forEach((el, index) => {
        const pos = trailPositions[index]
        if (el && pos) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
          el.style.opacity = String(0.22 * (1 - index / TRAIL_LENGTH))
        }
      })

      frameId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseout', handleOut, { passive: true })
    frameId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'none',
        '@media (hover: hover) and (pointer: fine)': {
          '@media (prefers-reduced-motion: no-preference)': {
            display: 'block',
          },
        },
      }}
    >
      {Array.from({ length: TRAIL_LENGTH }).map((_, index) => (
        <Box
          key={index}
          ref={(el) => {
            trailRefs.current[index] = el
          }}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            pointerEvents: 'none',
            zIndex: 9998,
            willChange: 'transform',
          }}
        />
      ))}
      <Box ref={posRef} sx={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, willChange: 'transform' }}>
        <Box
          ref={iconRef}
          sx={{
            display: 'block',
            fontFamily: '"Consolas", "SFMono-Regular", Menlo, Monaco, monospace',
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1,
            letterSpacing: '-1px',
            color: 'primary.main',
            filter: 'drop-shadow(0 1px 4px rgba(66,114,246,0.5))',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), font-size 0.3s ease, color 0.25s ease',
            transform: 'rotate(0deg) scale(1)',
            '&.cursor-hover': {
              fontSize: 26,
              color: 'primary.dark',
              transform: 'rotate(-12deg) scale(1.1)',
            },
          }}
        >
          {'</>'}
        </Box>
      </Box>
    </Box>
  )
}

export default CustomCursor
