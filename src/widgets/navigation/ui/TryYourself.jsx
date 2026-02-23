import Link from 'next/link';

import { useNavContext } from './NavigationContext';

export const TryYourself = () => {
  // 컴포넌트 내부에서 더이상 조건을 따지지 않습니다.
  const { tryYourself } = useNavContext();

  return (
    <Link
      href={tryYourself.href}
      className="rounded-sm border-2 border-dashed border-zinc-500 p-1.5 text-xs whitespace-nowrap !text-zinc-900 transition-all duration-500 hover:border-zinc-300 md:p-2 md:text-sm dark:!text-zinc-100"
    >
      {tryYourself.label}
    </Link>
  );
};
