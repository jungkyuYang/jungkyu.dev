import { HomePage } from '@/views/home/ui/HomePage';

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return <HomePage customUsername={searchParams.customUsername} />;
}
