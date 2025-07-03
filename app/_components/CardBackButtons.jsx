import Link from "next/link";

export default function CardBackButtons({ buttons = [] }) {
  return (
    <div className="flex flex-col gap-2 items-center w-full px-4">
      {buttons.map((btn, idx) =>
        btn.type === "external" ? (
          <a
            key={idx}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 text-base rounded transition-colors text-zinc-700 dark:text-zinc-300 hover:text-white dark:hover:text-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-100 text-center font-medium"
          >
            {btn.label}
          </a>
        ) : (
          <Link
            key={idx}
            href={btn.url}
            className="w-full py-3 text-base rounded transition-colors text-zinc-700 dark:text-zinc-300 hover:text-white dark:hover:text-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-100 text-center font-medium"
          >
            {btn.label}
          </Link>
        )
      )}
    </div>
  );
}
