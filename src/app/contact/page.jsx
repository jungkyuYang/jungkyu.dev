import { ContactPage } from '@/views/contact/ui/ContactPage';

export default async function Page({ searchParams }) {
  const { username } = await searchParams;

  return <ContactPage username={username} />;
}
