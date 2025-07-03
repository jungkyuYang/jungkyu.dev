import { FaMobileAlt } from "react-icons/fa";
import { BiLink } from "react-icons/bi";
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
} from "react-icons/si";
import ExpoIcon from "../_components/ExpoIcon";

export const techIcons = {
  TypeScript: <SiTypescript className="inline mr-1 text-blue-500" />,
  React: <SiReact className="inline mr-1 text-sky-400" />,
  "React Native": (
    <>
      <SiReact className="inline mr-1 text-sky-400" />
      <FaMobileAlt className="inline mr-1 text-green-400" />
    </>
  ),
  "TanStack-Query": <SiReactquery className="inline mr-1 text-pink-500" />,
  Axios: <SiAxios className="inline mr-1 text-blue-400" />,
  TailwindCSS: <SiTailwindcss className="inline mr-1 text-cyan-400" />,
  Vercel: <SiVercel className="inline mr-1 text-black" />,
  "Framer-Motion": <SiFramer className="inline mr-1 text-fuchsia-500" />,
  Zustand: <span className="inline mr-1">🐻</span>,
  Shadcn: <span className="inline mr-1">💎</span>,
  Playwright: <span className="inline mr-1">🎭</span>,
  Emotion: <span className="inline mr-1">🎨</span>,
  Supabase: <SiSupabase className="inline mr-1 text-green-600" />,
  Netlify: <SiNetlify className="inline mr-1 text-blue-500" />,
  JavaScript: <SiJavascript className="inline mr-1 text-yellow-400" />,
  "Next.js": <SiNextdotjs className="inline mr-1 text-black" />,
  Redux: <SiRedux className="inline mr-1 text-purple-500" />,
  Scss: <SiSass className="inline mr-1 text-pink-400" />,
  "Msw(Mocking)": (
    <SiMockserviceworker className="inline mr-1 text-orange-500" />
  ),
  AWSamplify: <SiAwsamplify className="inline mr-1 text-yellow-500" />,
  "Amazon S3": <SiAmazons3 className="inline mr-1 text-orange-400" />,
  "REST API": <BiLink className="inline mr-1" />,
  Expo: <ExpoIcon className="inline mr-1" />,
  Firebase: <SiFirebase className="inline mr-1 text-yellow-500" />,
};
