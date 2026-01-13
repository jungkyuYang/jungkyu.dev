import { Contact } from './Contact';
import data from '../../../data.json';
import { transformSocialLinks } from '../../_lib/github';
import { getUser, getSocialAccounts } from '../../_services/data';

export const ContactWrapper = async ({ username }) => {
  // 1. 서비스에 정의된 fetcher 직접 사용 (Parallel Fetching)
  const [user, githubSocials] = await Promise.all([getUser(username), getSocialAccounts(username)]);

  // 2. 비즈니스 로직 적용 (Transformation)
  const socialLinks = transformSocialLinks(username, user, githubSocials, data);

  // 3. UI 렌더링
  return <Contact socialLinks={socialLinks.slice(0, 3)} />;
};
