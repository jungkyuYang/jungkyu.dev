import Link from 'next/link';

export const NavigationLink = ({ href, label }) => (
  <li className="list-none">
    <Link
      href={href}
      className="relative text-base text-zinc-900 transition-colors hover:text-zinc-700 md:text-lg dark:text-zinc-100 dark:hover:text-zinc-300"
    >
      {label}
    </Link>
  </li>
);
