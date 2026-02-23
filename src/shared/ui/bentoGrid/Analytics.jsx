'use client';

import { useState, useEffect } from 'react';

import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis, XAxis } from 'recharts';

export const Analytics = ({ totalUsers, todayUsers, chartData }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full animate-pulse rounded-3xl" />;
  }

  const dateTicks =
    chartData && chartData.length > 1
      ? [chartData[0].date, chartData[chartData.length - 1].date]
      : [];

  const CustomTick = ({ x, y, payload, index, visibleTicksCount }) => {
    const isFirst = index === 0;
    const isLast = index === visibleTicksCount - 1;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={12}
          fontSize={9}
          fontWeight={800}
          fill="#a1a1aa"
          textAnchor={isFirst ? 'start' : isLast ? 'end' : 'middle'}
          className="select-none"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    // select-none으로 텍스트 드래그만 방지
    <div className="flex h-full w-full flex-col overflow-hidden p-4 select-none md:p-6">
      {/* 헤더 */}
      <header className="mb-2 flex min-w-0 shrink-0 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col">
          <h3 className="truncate text-[9px] font-black tracking-widest text-zinc-400 uppercase md:text-[10px] dark:text-zinc-500">
            GA Audience Total
          </h3>
          <div className="flex items-baseline gap-1 font-black text-zinc-900 dark:text-zinc-100">
            <span className="text-xl leading-none tracking-tighter tabular-nums sm:text-2xl md:text-3xl lg:text-4xl">
              {totalUsers?.toLocaleString() || 0}
            </span>
            <span className="text-[8px] text-zinc-400 uppercase md:text-[9px]">Total</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
          <span className="text-[7px] font-black tracking-tighter text-emerald-600 uppercase md:text-[8px] dark:text-emerald-400">
            Today
          </span>
          <span className="text-xs leading-none font-black text-emerald-600 tabular-nums sm:text-sm md:text-base dark:text-emerald-400">
            +{todayUsers?.toLocaleString() || 0}
          </span>
        </div>
      </header>

      {/* 그래프 영역: cursor-default를 주어 클릭 가능한 요소가 아님을 암시 */}
      <div className="relative flex min-h-0 w-full flex-1 cursor-default flex-col">
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                hide={false}
                axisLine={false}
                tickLine={false}
                ticks={dateTicks}
                padding={{ left: 0, right: 0 }}
                tick={<CustomTick />}
                interval={0}
                height={25}
              />

              <YAxis hide={true} domain={['dataMin', 'auto']} />

              {/* 툴팁 유지: 호버 시 데이터 확인 가능 */}
              <Tooltip
                cursor={{ stroke: '#10b981', strokeWidth: 1 }}
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/95 p-2 px-3 text-[10px] text-white shadow-2xl backdrop-blur-sm">
                      <p className="mb-0.5 font-bold opacity-50">{payload[0].payload.date}</p>
                      <p className="text-sm font-black text-emerald-400">
                        {payload[0].value.toLocaleString()}
                      </p>
                    </div>
                  ) : null
                }
              />

              <Area
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                fill="url(#colorCumulative)"
                strokeWidth={3}
                isAnimationActive={true}
                connectNulls={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-1 animate-pulse items-center justify-center text-[9px] font-black tracking-widest text-zinc-400 uppercase italic">
            Syncing...
          </div>
        )}
      </div>

      {/* 푸터 */}
      <footer className="flex shrink-0 items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/50">
        <div className="flex min-w-0 items-center gap-2 text-zinc-400">
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="truncate text-[8px] font-black tracking-widest uppercase">
            Google Analytics
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-[10px] font-black text-emerald-500 italic">
          <span className="opacity-50">TREND</span>
          <span>UP ↗</span>
        </div>
      </footer>
    </div>
  );
};
