import { Suspense } from 'react';

import { ContactPage } from '@/pages/contact/ui/ContactPage';
import { ContactSkeleton } from '@/pages/contact/ui/ContactSkeleton';

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <Suspense fallback={<ContactSkeleton count={3} />}>
      <ContactPage customUsername={searchParams.customUsername} />
    </Suspense>
  );
}
