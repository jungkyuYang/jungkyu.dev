import { getUser, getSocialAccounts } from '@/shared/api/data';
import data from '@/shared/constants/data.json';

import { ContactView } from './ContactView';

export async function ContactPage({ customUsername }) {
  const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;

  // 데이터 페칭 (Suspense가 이 작업을 기다립니다)
  const [user, githubSocials] = await Promise.all([getUser(username), getSocialAccounts(username)]);

  const email = user.email || data.email;

  return <ContactView username={username} email={email} githubSocials={githubSocials} />;
}
