export const initialSkillsData = [
  {
    id: 1,
    icon: 'html',
    name: 'HTML',
    level: 60,
    category: 'Frontend',
    description: '웹 문서의 구조를 만드는 마크업 언어',
  },
  {
    id: 2,
    icon: 'css',
    name: 'CSS',
    level: 60,
    category: 'Frontend',
    description: '웹 페이지의 스타일과 레이아웃을 담당하는 언어',
  },
  {
    id: 3,
    icon: 'javascript',
    name: 'JavaScript',
    level: 60,
    category: 'Frontend',
    description: '웹의 동작과 상호작용을 구현하는 프로그래밍 언어',
  },
  {
    id: 4,
    icon: 'react',
    name: 'React',
    level: 60,
    category: 'Framework',
    description: '컴포넌트 기반 UI를 만드는 자바스크립트 라이브러리',
  },
  {
    id: 5,
    icon: 'figma',
    name: 'Figma',
    level: 70,
    category: 'Design',
    description: 'UI/UX 디자인과 프로토타이핑을 위한 협업 툴',
  },
  {
    id: 6,
    icon: 'photoshop',
    name: 'Adobe Photoshop',
    level: 70,
    category: 'Design',
    description: '이미지 편집과 그래픽 합성을 위한 툴',
  },
  {
    id: 7,
    icon: 'illustrator',
    name: 'Adobe Illustrator',
    level: 70,
    category: 'Design',
    description: '벡터 기반 일러스트 및 그래픽 디자인 툴',
  },
]

export const DEFAULT_SKILL_COLOR = '#3d5afe'

export const categoryColors = {
  Frontend: '#5c6bc0',
  Framework: '#26a69a',
  Design: '#ec407a',
  Backend: '#66bb6a',
  '도구 & 기타': '#8d6e63',
}

// 다크 모드용 포인트 컬러 — 차콜 배경 위에서 선명하게 보이는 민트/시안 계열 위주.
export const DEFAULT_SKILL_COLOR_DARK = '#2dd4bf'

export const categoryColorsDark = {
  Frontend: '#38bdf8',
  Framework: '#2dd4bf',
  Design: '#a78bfa',
  Backend: '#4ade80',
  '도구 & 기타': '#fb923c',
}

export const categoryOrder = ['Frontend', 'Framework', 'Design', 'Backend', '도구 & 기타']

export function getCategoryColor(category, mode) {
  const map = mode === 'dark' ? categoryColorsDark : categoryColors
  const fallback = mode === 'dark' ? DEFAULT_SKILL_COLOR_DARK : DEFAULT_SKILL_COLOR
  return map[category] ?? fallback
}

export function getSkillsSortedByLevel(skills) {
  return [...skills].sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
}
