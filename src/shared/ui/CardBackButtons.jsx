import Link from 'next/link';

export default function CardBackButtons({ buttons = [] }) {
  return (
    <div className="flex w-full flex-col items-center gap-2 px-4">
      {buttons.map((btn, idx) =>
        btn.type === 'external' ? (
          <a
            key={idx}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded py-3 text-center text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-900 hover:text-white dark:text-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
          >
            {btn.label}
          </a>
        ) : (
          <Link
            key={idx}
            href={btn.url}
            className="w-full rounded py-3 text-center text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-900 hover:text-white dark:text-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
          >
            {btn.label}
          </Link>
        ),
      )}
    </div>
  );
}
