import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages는 /my-portfolio/ 서브경로에서 서빙되지만, Vercel은 루트 도메인에서
  // 서빙되므로 Vercel 빌드 시 자동으로 설정되는 VERCEL 환경변수로 base를 분기한다.
  base: process.env.VERCEL ? '/' : '/my-portfolio/',
})
