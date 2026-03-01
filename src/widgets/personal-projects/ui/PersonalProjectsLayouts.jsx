export const PersonalProjectsRoot = ({ children }) => (
  // 🌟 마음에 드셨던 테두리 스타일을 Root 레이아웃에 직접 이식합니다.
  <section className="relative rounded-xl border-2 border-dashed border-emerald-500/30 p-4">
    {/* Debug 텍스트 대신 세련된 라벨로 활용할 수도 있습니다 */}
    <span className="absolute -top-3 left-4 bg-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-emerald-500 uppercase dark:bg-zinc-950">
      Personal projects
    </span>
    <div className="pt-4">{children}</div>
  </section>
);

export const PersonalProjectsHeaderArea = ({ children }) => (
  <header className="mb-8 flex items-center gap-2">{children}</header>
);

export const PersonalProjectsGrid = ({ children }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">{children}</div>
);

export const PersonalProjectsSkeleton = () => (
  <section className="relative mb-20 rounded-xl border-2 border-dashed border-emerald-500/20 p-6 opacity-50">
    <div className="absolute -top-3 left-4 bg-white px-2 py-0.5 font-mono text-[10px] text-emerald-600 uppercase dark:bg-zinc-950">
      Loading...
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      ))}
    </div>
  </section>
);
