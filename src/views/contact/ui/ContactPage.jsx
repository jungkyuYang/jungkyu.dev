import { getUser, getSocialAccounts } from '@/shared/api/data';
import data from '@/shared/constants/data.json';

import { ContactView } from './ContactView';
import { parseContacts } from '../lib/parse-contacts'; // 가공 로직 임포트

export async function ContactPage({ username: propUsername }) {
  // [1] 데이터 확보
  const targetUsername = propUsername || process.env.GITHUB_USERNAME || data.githubUsername;

  const [user, githubSocials] = await Promise.all([
    getUser(targetUsername),
    getSocialAccounts(targetUsername),
  ]);

  const email = user.email || data.email;

  const parsedItems = parseContacts(targetUsername, email, githubSocials);

  const pageData = {
    PageHeader: {
      title: 'Contact',
      description: '이메일이나 SNS를 통해 언제든 편하게 연락해 주세요.',
    },
    SocialCardGridWidget: {
      items: parsedItems,
    },
  };

  return <ContactView data={pageData} />;
}
