import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 배포 환경에 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY가 설정되어 있지 않으면
// createClient()가 즉시 예외를 던져 앱 전체가 렌더링되지 못한다. 값이 없을 땐
// null을 내보내서, 호출하는 쪽에서 로딩 실패 상태로 자연스럽게 처리하게 한다.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

if (!supabase) {
  console.warn(
    'Supabase 환경변수(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)가 설정되지 않아 Guestbook/Projects 기능이 비활성화됩니다.',
  )
}
