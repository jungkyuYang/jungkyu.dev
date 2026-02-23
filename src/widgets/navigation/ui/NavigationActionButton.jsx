import Link from 'next/link';

export const NavigationActionButton = ({ href, label }) => (
  <li className="shrink-0 list-none">
    <Link
      href={href}
      className="rounded-sm border-2 border-dashed border-zinc-500 p-1.5 text-xs whitespace-nowrap text-zinc-900 transition-all hover:border-zinc-300 md:p-2 md:text-sm dark:text-zinc-100"
    >
      {label}
    </Link>
  </li>
);
