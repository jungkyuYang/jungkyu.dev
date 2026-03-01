export const TeamProjectsRoot = ({ children }) => (
  <section className="relative rounded-xl border-2 border-dashed border-indigo-500/30 p-6 transition-colors hover:border-indigo-500/50">
    {/* 상단 포인트 라벨 */}
    <span className="absolute -top-3 left-4 bg-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-indigo-600 uppercase dark:bg-zinc-950">
      Team Projects
    </span>
    <div className="pt-2">{children}</div>
  </section>
);

export const TeamProjectsHeaderArea = ({ children }) => (
  <header className="mb-8 flex items-center gap-2">{children}</header>
);

export const TeamProjectsGrid = ({ children }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">{children}</div>
);

export const TeamProjectsSkeleton = () => (
  <section className="relative mb-20 rounded-xl border-2 border-dashed border-indigo-500/20 p-6 opacity-50">
    <div className="absolute -top-3 left-4 bg-white px-2 py-0.5 font-mono text-[10px] text-indigo-600 uppercase dark:bg-zinc-950">
      Loading...
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      ))}
    </div>
  </section>
);
