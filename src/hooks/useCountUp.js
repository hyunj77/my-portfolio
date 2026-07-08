import { useEffect, useRef, useState } from 'react'

// start가 true가 되는 순간부터 0에서 target까지 requestAnimationFrame으로 카운팅한다.
export function useCountUp(target, { start = true, duration = 900, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!start) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return undefined
    }

    const startTime = performance.now()

    function tick(now) {
      const progress = Math.max(0, Math.min(1, (now - startTime) / duration))
      const eased = 1 - (1 - progress) ** 3
      const next = target * eased
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, start, duration, decimals])

  return value
}
