export const ProjectDetailHeader = ({ title, description }) => (
  <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
    <div className="flex-1">
      <h1 className="mb-4 text-3xl font-bold tracking-tight break-keep md:text-5xl">{title}</h1>
      <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base dark:text-zinc-400">
        {description}
      </p>
    </div>
    <div className="flex h-fit gap-2 pb-1">
      <span className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-medium dark:border-zinc-700 dark:bg-zinc-800">
        Documentation
      </span>
      <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400">
        PDF
      </span>
    </div>
  </header>
);
