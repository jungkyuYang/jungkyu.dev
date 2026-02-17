export const GitHubStats = ({ stats }) => {
  if (!stats) return <GitHubStatsSkeleton />;
  const { metrics, chart } = stats;

  return (
    <section
      className="flex h-full w-full flex-col p-3 select-none overflow-hidden"
      aria-label="GitHub Activity Statistics"
    >
      {/* 1. Header Area */}
      <header className="flex-none mb-3 border-b border-black/[0.05] dark:border-white/[0.05] pb-1.5">
        <div className="flex items-center justify-between w-full px-0.5">
          <h2 className="text-[9px] font-black tracking-[0.12em] uppercase text-[#1D1D1F] dark:text-[#F5F5F7]">
            Activity Report
          </h2>
          <time className="text-[8px] font-bold text-[#86868B] uppercase tracking-tighter tabular-nums">
            90 Days
          </time>
        </div>
      </header>

      {/* 2. Top Metrics */}
      <div className="flex-none flex justify-between px-0.5 mb-5">
        <article className="flex flex-col">
          <span className="text-[20px] font-black tracking-tighter text-[#0071E3] dark:text-[#0A84FF] leading-none tabular-nums">
            +{metrics[0]?.value.toLocaleString()}
          </span>
          <h3 className="text-[7.5px] font-bold text-[#86868B] uppercase tracking-wider mt-1">
            Contributions
          </h3>
        </article>
        <article className="flex flex-col items-end">
          <div className="flex items-center gap-0.5 leading-none text-[#1D1D1F] dark:text-[#F5F5F7]">
            <span className="text-[#FF9500] text-[12px] -translate-y-0.5">★</span>
            <span className="text-[20px] font-black tracking-tighter tabular-nums">
              {metrics[1]?.value.toLocaleString()}
            </span>
          </div>
          <h3 className="text-[7.5px] font-bold text-[#86868B] uppercase tracking-wider mt-1">
            Total Stars
          </h3>
        </article>
      </div>

      {/* 3. Integrated Skill Chart: 바와 리스트의 매칭 순서 동기화 */}
      <div className="flex-1 flex gap-5 px-1 items-center min-h-0">
        {/* 통합 수직 스택 바: 아래(0)에서 위(100)로 쌓임 */}
        <div className="relative w-2.5 h-full max-h-[110px] bg-black/[0.05] dark:bg-white/[0.05] rounded-full overflow-hidden flex flex-col-reverse ring-1 ring-inset ring-black/[0.02]">
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
        <ul className="flex-1 flex flex-col-reverse justify-between h-full max-h-[110px] py-1">
          {chart.data.slice(0, 4).map((item, idx) => (
            <li key={idx} className="relative flex items-center justify-between group">
              {/* 시각적 연결선: 바와 텍스트 사이의 다리 역할 */}
              <div className="absolute -left-4 w-3 h-[1px] bg-black/[0.1] dark:bg-white/[0.1]" />

              <div className="flex items-center gap-2 overflow-hidden mr-2">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[9.5px] font-bold text-[#515154] dark:text-[#A1A1A6] truncate leading-none">
                  {item.name}
                </span>
              </div>

              <span className="text-[9px] font-black text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums shrink-0">
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
    className="flex h-full w-full flex-col p-3 animate-pulse select-none overflow-hidden"
    aria-hidden="true"
  >
    <header className="flex-none mb-2 border-b border-black/[0.05] dark:border-white/[0.05] pb-1.5">
      <div className="flex items-center justify-between w-full px-0.5">
        <div className="h-2.5 w-20 bg-gray-200 dark:bg-zinc-800 rounded-sm" />
        <div className="h-2 w-10 bg-gray-100 dark:bg-zinc-800/60 rounded-sm" />
      </div>
    </header>
    <div className="flex-[1.4] flex flex-col justify-center min-h-0 py-2">
      <div className="flex items-end justify-between px-0.5">
        <div className="flex flex-col gap-2">
          <div className="h-2 w-12 bg-gray-100 dark:bg-zinc-800/60 rounded-sm" />
          <div className="h-7 w-20 bg-gray-200 dark:bg-zinc-800 rounded-md" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-2 w-8 bg-gray-100 dark:bg-zinc-800/60 rounded-sm" />
          <div className="h-7 w-20 bg-gray-200 dark:bg-zinc-800 rounded-md" />
        </div>
      </div>
    </div>
    <figure className="flex-1 flex flex-col justify-end mt-auto pt-1 space-y-3">
      <div className="h-2.5 w-full bg-gray-100 dark:bg-zinc-800/40 rounded-full" />
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-gray-50 dark:bg-zinc-800/30 rounded-sm" />
        ))}
      </div>
    </figure>
  </section>
);
