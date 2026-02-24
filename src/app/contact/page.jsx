import { ContactPage } from '@/views/contact/ui/ContactPage';

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return <ContactPage customUsername={searchParams.customUsername} />;
}
