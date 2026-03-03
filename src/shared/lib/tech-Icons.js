import { BiLink } from 'react-icons/bi';
import { FaMobileAlt } from 'react-icons/fa';
import {
  SiTypescript,
  SiReact,
  SiReactquery,
  SiAxios,
  SiTailwindcss,
  SiVercel,
  SiFramer,
  SiSupabase,
  SiNetlify,
  SiJavascript,
  SiNextdotjs,
  SiRedux,
  SiSass,
  SiMockserviceworker,
  SiAwsamplify,
  SiAmazons3,
  SiFirebase,
} from 'react-icons/si';

// 커스텀 SVG (Export 하지 않고 내부에서만 정의해도 충분합니다)
const ExpoIcon = ({ className, style }) => (
  <svg className={className} style={style} width="1em" height="1em" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#000" />
    <path d="M10.5 22L16 10l5.5 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TECH_ICON_CONFIG = {
  TypeScript: { icon: SiTypescript, color: 'text-blue-500' },
  React: { icon: SiReact, color: 'text-sky-400' },
  'React Native': {
    isMulti: true,
    components: [
      { icon: SiReact, color: 'text-sky-400' },
      { icon: FaMobileAlt, color: 'text-green-400' },
    ],
  },
  'TanStack-Query': { icon: SiReactquery, color: 'text-pink-500' },
  Axios: { icon: SiAxios, color: 'text-blue-400' },
  TailwindCSS: { icon: SiTailwindcss, color: 'text-cyan-400' },
  Vercel: { icon: SiVercel, color: 'text-black dark:text-white' },
  'Framer-Motion': { icon: SiFramer, color: 'text-fuchsia-500' },
  Supabase: { icon: SiSupabase, color: 'text-green-600' },
  Netlify: { icon: SiNetlify, color: 'text-blue-500' },
  JavaScript: { icon: SiJavascript, color: 'text-yellow-400' },
  'Next.js': { icon: SiNextdotjs, color: 'text-black dark:text-white' },
  Redux: { icon: SiRedux, color: 'text-purple-500' },
  Scss: { icon: SiSass, color: 'text-pink-400' },
  'Msw(Mocking)': { icon: SiMockserviceworker, color: 'text-orange-500' },
  AWSamplify: { icon: SiAwsamplify, color: 'text-yellow-500' },
  'Amazon S3': { icon: SiAmazons3, color: 'text-orange-400' },
  'REST API': { icon: BiLink, color: 'text-gray-500' },
  Expo: { icon: ExpoIcon, color: '' },
  Firebase: { icon: SiFirebase, color: 'text-yellow-500' },

  // 이모지 케이스
  Zustand: { emoji: '🐻' },
  Shadcn: { emoji: '💎' },
  Playwright: { emoji: '🎭' },
  Emotion: { emoji: '🎨' },
};
