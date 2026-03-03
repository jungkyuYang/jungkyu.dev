import { getUser, getSocialAccounts } from '@/shared/api/data';
import data from '@/shared/constants/data.json';
import { transformSocialLinks } from '@/shared/lib/github';

import { Contact } from './Contact';

export const ContactWrapper = async ({ username }) => {
  // 1. 서비스에 정의된 fetcher 직접 사용 (Parallel Fetching)
  const [user, githubSocials] = await Promise.all([getUser(username), getSocialAccounts(username)]);

  // 2. 비즈니스 로직 적용 (Transformation)
  const socialLinks = transformSocialLinks(username, user, githubSocials, data);

  // 3. UI 렌더링
  return <Contact socialLinks={socialLinks.slice(0, 3)} />;
};
