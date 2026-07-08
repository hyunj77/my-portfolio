import { useEffect, useRef, useState } from 'react'

// 스크롤을 아래로 내리면 true(숨김), 위로 올리면 false(표시)를 반환한다.
// threshold보다 작은 움직임은 무시해서 미세한 떨림에 반응하지 않는다.
export function useScrollDirection(threshold = 8) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    function update() {
      const currentY = window.scrollY
      const delta = currentY - lastY.current

      if (Math.abs(delta) > threshold) {
        setHidden(currentY > lastY.current && currentY > 0)
        lastY.current = currentY
      }
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return hidden
}
