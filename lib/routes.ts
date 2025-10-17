// ページ遷移パス定義
export const ROUTES = {
  HOME: '/',
  CAREER: '/career',
  PROJECT: (id: string) => `/project/${id}`,
  BLOG: '/blog',
  BLOG_DETAIL: (slug: string) => `/blog/${slug}`,
  NEWS: '/news',
} as const;

// セクションID定義
export const SECTIONS = {
  ABOUT: 'about',
  SERVICES: 'services',
  WORKS: 'works',
  CONTACT: 'contact',
} as const;
