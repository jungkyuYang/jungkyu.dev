import { getUser, getSocialAccounts } from '@/shared/api/data';
import data from '@/shared/constants/data.json';

import { ContactView } from './ContactView';

export async function ContactPage({ customUsername }) {
  const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;

  const [user, githubSocials] = await Promise.all([getUser(username), getSocialAccounts(username)]);

  const email = user.email || data.email;

  return <ContactView username={username} email={email} githubSocials={githubSocials} />;
}
