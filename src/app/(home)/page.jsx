import { HomePage } from '@/views/home/ui/HomePage';

export default async function Page({ searchParams }) {
  const { username } = await searchParams;

  return <HomePage username={username} />;
}
