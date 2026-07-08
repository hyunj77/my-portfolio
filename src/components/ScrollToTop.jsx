import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 메뉴 클릭으로 다른 페이지(섹션)로 이동하면 맨 위로 부드럽게 스크롤한다.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [pathname])

  return null
}

export default ScrollToTop
