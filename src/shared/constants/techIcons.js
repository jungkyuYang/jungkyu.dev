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

import ExpoIcon from '../ui/ExpoIcon';

export const TECH_ICONS = {
  TypeScript: <SiTypescript className="mr-1 inline text-blue-500" />,
  React: <SiReact className="mr-1 inline text-sky-400" />,
  'React Native': (
    <>
      <SiReact className="mr-1 inline text-sky-400" />
      <FaMobileAlt className="mr-1 inline text-green-400" />
    </>
  ),
  'TanStack-Query': <SiReactquery className="mr-1 inline text-pink-500" />,
  Axios: <SiAxios className="mr-1 inline text-blue-400" />,
  TailwindCSS: <SiTailwindcss className="mr-1 inline text-cyan-400" />,
  Vercel: <SiVercel className="mr-1 inline text-black" />,
  'Framer-Motion': <SiFramer className="mr-1 inline text-fuchsia-500" />,
  Zustand: <span className="mr-1 inline">🐻</span>,
  Shadcn: <span className="mr-1 inline">💎</span>,
  Playwright: <span className="mr-1 inline">🎭</span>,
  Emotion: <span className="mr-1 inline">🎨</span>,
  Supabase: <SiSupabase className="mr-1 inline text-green-600" />,
  Netlify: <SiNetlify className="mr-1 inline text-blue-500" />,
  JavaScript: <SiJavascript className="mr-1 inline text-yellow-400" />,
  'Next.js': <SiNextdotjs className="mr-1 inline text-black" />,
  Redux: <SiRedux className="mr-1 inline text-purple-500" />,
  Scss: <SiSass className="mr-1 inline text-pink-400" />,
  'Msw(Mocking)': <SiMockserviceworker className="mr-1 inline text-orange-500" />,
  AWSamplify: <SiAwsamplify className="mr-1 inline text-yellow-500" />,
  'Amazon S3': <SiAmazons3 className="mr-1 inline text-orange-400" />,
  'REST API': <BiLink className="mr-1 inline" />,
  Expo: <ExpoIcon className="mr-1 inline" />,
  Firebase: <SiFirebase className="mr-1 inline text-yellow-500" />,
};
