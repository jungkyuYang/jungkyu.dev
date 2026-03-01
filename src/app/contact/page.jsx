import { parseContacts } from '@/entities/user/lib/parse-contacts'; // 경로는 나중에 entities나 shared로 옮겨도 좋습니다.
import { getUser, getSocialAccounts } from '@/shared/api/data';
import data from '@/shared/constants/data.json';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SocialCardGridWidget } from '@/widgets/social-card-grid/ui/SocialCardGridWidget';

export default async function Page({ searchParams }) {
  const { username } = await searchParams;
  const targetUsername = username || process.env.GITHUB_USERNAME || data.githubUsername;

  // 1. 데이터 병렬 패칭
  const [user, githubSocials] = await Promise.all([
    getUser(targetUsername),
    getSocialAccounts(targetUsername),
  ]);

  // 2. 가공 로직 실행
  const parsedItems = parseContacts(targetUsername, user.email, githubSocials);

  return (
    <article className="animate-fade-in flex w-full flex-1 flex-col items-center">
      <PageHeader
        title="Contact"
        description="이메일이나 SNS를 통해 언제든 편하게 연락해 주세요."
      />

      <section className="w-full">
        <SocialCardGridWidget items={parsedItems} />
      </section>
    </article>
  );
}
