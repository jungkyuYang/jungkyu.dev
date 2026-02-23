import { Suspense } from 'react';

import { HomePage } from '@/pages/home/ui/HomePage';
import { HomeSkeleton } from '@/pages/home/ui/HomeSkeleton';

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomePage customUsername={searchParams.customUsername} />
    </Suspense>
  );
}
