export const GitHubStats = ({ stats }) => {
  if (!stats) return <GitHubStatsSkeleton />;
  const { metrics, chart } = stats;

  return (
    <section
      className="flex h-full w-full flex-col overflow-hidden p-3 select-none"
      aria-label="GitHub Activity Statistics"
    >
      {/* 1. Header Area */}
      <header className="mb-3 flex-none border-b border-black/[0.05] pb-1.5 dark:border-white/[0.05]">
        <div className="flex w-full items-center justify-between px-0.5">
          <h2 className="text-[9px] font-black tracking-[0.12em] text-[#1D1D1F] uppercase dark:text-[#F5F5F7]">
            Activity Report
          </h2>
          <time className="text-[8px] font-bold tracking-tighter text-[#86868B] uppercase tabular-nums">
            90 Days
          </time>
        </div>
      </header>

      {/* 2. Top Metrics */}
      <div className="mb-5 flex flex-none justify-between px-0.5">
        <article className="flex flex-col">
          <span className="text-[20px] leading-none font-black tracking-tighter text-[#0071E3] tabular-nums dark:text-[#0A84FF]">
            +{metrics[0]?.value.toLocaleString()}
          </span>
          <h3 className="mt-1 text-[7.5px] font-bold tracking-wider text-[#86868B] uppercase">
            Contributions
          </h3>
        </article>
        <article className="flex flex-col items-end">
          <div className="flex items-center gap-0.5 leading-none text-[#1D1D1F] dark:text-[#F5F5F7]">
            <span className="-translate-y-0.5 text-[12px] text-[#FF9500]">★</span>
            <span className="text-[20px] font-black tracking-tighter tabular-nums">
              {metrics[1]?.value.toLocaleString()}
            </span>
          </div>
          <h3 className="mt-1 text-[7.5px] font-bold tracking-wider text-[#86868B] uppercase">
            Total Stars
          </h3>
        </article>
      </div>

      {/* 3. Integrated Skill Chart: 바와 리스트의 매칭 순서 동기화 */}
      <div className="flex min-h-0 flex-1 items-center gap-5 px-1">
        {/* 통합 수직 스택 바: 아래(0)에서 위(100)로 쌓임 */}
        <div className="relative flex h-full max-h-[110px] w-2.5 flex-col-reverse overflow-hidden rounded-full bg-black/[0.05] ring-1 ring-black/[0.02] ring-inset dark:bg-white/[0.05]">
          {chart.data.map((item, idx) => (
            <div
              key={idx}
              style={{
                height: `${item.percent}%`,
                backgroundColor: item.color,
              }}
              className="w-full border-t border-white/10 last:border-none"
            />
          ))}
        </div>

        {/* 우측 매칭 리스트: flex-col-reverse를 사용하여 아래 아이템부터 위로 배치 */}
        <ul className="flex h-full max-h-[110px] flex-1 flex-col-reverse justify-between py-1">
          {chart.data.slice(0, 4).map((item, idx) => (
            <li key={idx} className="group relative flex items-center justify-between">
              {/* 시각적 연결선: 바와 텍스트 사이의 다리 역할 */}
              <div className="absolute -left-4 h-[1px] w-3 bg-black/[0.1] dark:bg-white/[0.1]" />

              <div className="mr-2 flex items-center gap-2 overflow-hidden">
                <div
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-[9.5px] leading-none font-bold text-[#515154] dark:text-[#A1A1A6]">
                  {item.name}
                </span>
              </div>

              <span className="shrink-0 text-[9px] font-black text-[#1D1D1F] tabular-nums dark:text-[#F5F5F7]">
                {item.percent}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
// 스켈레톤 컴포넌트는 이전과 동일하게 유지
export const GitHubStatsSkeleton = () => (
  <section
    className="flex h-full w-full animate-pulse flex-col overflow-hidden p-3 select-none"
    aria-hidden="true"
  >
    <header className="mb-2 flex-none border-b border-black/[0.05] pb-1.5 dark:border-white/[0.05]">
      <div className="flex w-full items-center justify-between px-0.5">
        <div className="h-2.5 w-20 rounded-sm bg-gray-200 dark:bg-zinc-800" />
        <div className="h-2 w-10 rounded-sm bg-gray-100 dark:bg-zinc-800/60" />
      </div>
    </header>
    <div className="flex min-h-0 flex-[1.4] flex-col justify-center py-2">
      <div className="flex items-end justify-between px-0.5">
        <div className="flex flex-col gap-2">
          <div className="h-2 w-12 rounded-sm bg-gray-100 dark:bg-zinc-800/60" />
          <div className="h-7 w-20 rounded-md bg-gray-200 dark:bg-zinc-800" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-2 w-8 rounded-sm bg-gray-100 dark:bg-zinc-800/60" />
          <div className="h-7 w-20 rounded-md bg-gray-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
    <figure className="mt-auto flex flex-1 flex-col justify-end space-y-3 pt-1">
      <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-zinc-800/40" />
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 rounded-sm bg-gray-50 dark:bg-zinc-800/30" />
        ))}
      </div>
    </figure>
  </section>
);
