import { useEffect, useRef } from 'react'

// 요소가 뷰포트 중심에서 얼마나 떨어져 있는지에 비례해 --parallax-y CSS 커스텀
// 프로퍼티를 갱신한다. React state를 쓰지 않고 DOM에 직접 씀으로써 리렌더 없이
// transform3d로 움직이도록 하고, 스크롤 이벤트는 requestAnimationFrame으로 스로틀한다.
export function useParallax(speed = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let ticking = false

    function update() {
      const rect = node.getBoundingClientRect()
      const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2
      node.style.setProperty('--parallax-y', (distanceFromCenter * speed).toFixed(2))
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return ref
}
