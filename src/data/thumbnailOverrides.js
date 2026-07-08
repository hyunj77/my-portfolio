// DB의 thumbnail_url은 생성된(generated) 컬럼이라 detail_url 기반 실시간 스크린샷
// 프록시(thum.io) 값으로 고정돼 있다. 느리고 불안정해서, 알려진 프로젝트는
// 미리 캡처해 둔 정적 이미지로 화면 표시만 덮어쓴다.
const THUMBNAIL_OVERRIDES = {
  'https://hyunj77.github.io/my-community/': `${import.meta.env.BASE_URL}project-thumbnails/my-community.png`,
  'https://hyunj77.github.io/mini-sns/': `${import.meta.env.BASE_URL}project-thumbnails/mini-sns.png`,
}

export function resolveThumbnailUrl(project) {
  return THUMBNAIL_OVERRIDES[project.detail_url] ?? project.thumbnail_url
}
