export const initialSkillsData = [
  {
    id: 1,
    icon: 'html',
    name: 'HTML',
    level: 80,
    category: 'Frontend',
    description: '웹 문서의 구조를 만드는 마크업 언어',
    isMainSkill: true,
  },
  {
    id: 2,
    icon: 'css',
    name: 'CSS',
    level: 75,
    category: 'Frontend',
    description: '웹 페이지의 스타일과 레이아웃을 담당하는 언어',
    isMainSkill: true,
  },
  {
    id: 3,
    icon: 'javascript',
    name: 'JavaScript',
    level: 70,
    category: 'Frontend',
    description: '웹의 동작과 상호작용을 구현하는 프로그래밍 언어',
    isMainSkill: true,
  },
  {
    id: 4,
    icon: 'react',
    name: 'React',
    level: 60,
    category: 'Framework',
    description: '컴포넌트 기반 UI를 만드는 자바스크립트 라이브러리',
    isMainSkill: true,
  },
  {
    id: 5,
    icon: 'figma',
    name: 'Figma',
    level: 65,
    category: 'Design',
    description: 'UI/UX 디자인과 프로토타이핑을 위한 협업 툴',
    isMainSkill: true,
  },
  {
    id: 6,
    icon: 'photoshop',
    name: 'Adobe Photoshop',
    level: null,
    category: 'Design',
    description: '이미지 편집과 그래픽 합성을 위한 툴',
    isMainSkill: false,
  },
  {
    id: 7,
    icon: 'illustrator',
    name: 'Adobe Illustrator',
    level: null,
    category: 'Design',
    description: '벡터 기반 일러스트 및 그래픽 디자인 툴',
    isMainSkill: false,
  },
]

export const availableSkillsCatalog = [
  { icon: 'vue', name: 'Vue.js', category: 'Frontend', description: '반응형 UI를 만드는 프론트엔드 프레임워크' },
  { icon: 'angular', name: 'Angular', category: 'Frontend', description: '대규모 웹 애플리케이션을 위한 프론트엔드 프레임워크' },
  { icon: 'typescript', name: 'TypeScript', category: 'Frontend', description: '정적 타입을 지원하는 자바스크립트 상위 언어' },
  { icon: 'node', name: 'Node.js', category: 'Backend', description: '서버 사이드 자바스크립트 런타임' },
  { icon: 'python', name: 'Python', category: 'Backend', description: '범용 프로그래밍 언어' },
  { icon: 'java', name: 'Java', category: 'Backend', description: '객체지향 프로그래밍 언어' },
  { icon: 'git', name: 'Git', category: '도구 & 기타', description: '분산 버전 관리 시스템' },
  { icon: 'react-native', name: 'React Native', category: '도구 & 기타', description: 'React 기반 크로스플랫폼 모바일 앱 프레임워크' },
  { icon: 'mongodb', name: 'MongoDB', category: '도구 & 기타', description: '문서 지향 NoSQL 데이터베이스' },
]

export const categoryColors = {
  Frontend: '#5c6bc0',
  Framework: '#26a69a',
  Design: '#ec407a',
  Backend: '#66bb6a',
  '도구 & 기타': '#8d6e63',
}

export const categoryOrder = ['Frontend', 'Framework', 'Design', 'Backend', '도구 & 기타']

export function getSkillsSortedByLevel(skills) {
  return [...skills].sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
}

export function getTopSkills(skills, count = 5) {
  return getSkillsSortedByLevel(skills.filter((skill) => skill.isMainSkill)).slice(0, count)
}
