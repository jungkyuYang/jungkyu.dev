'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis, XAxis } from 'recharts';

export const Analytics = ({ totalUsers, todayUsers, chartData }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full animate-pulse rounded-3xl" />;
  }

  const dateTicks = chartData && chartData.length > 1 
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
          textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
          className="select-none"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    // select-none으로 텍스트 드래그만 방지
    <div className="w-full h-full flex flex-col p-4 md:p-6 overflow-hidden select-none">
      
      {/* 헤더 */}
      <header className="flex justify-between items-center shrink-0 min-w-0 gap-2 mb-2">
        <div className="flex flex-col min-w-0">
          <h3 className="text-[9px] md:text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest truncate">
            GA Audience Total
          </h3>
          <div className="flex items-baseline gap-1 font-black text-zinc-900 dark:text-zinc-100">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tabular-nums tracking-tighter leading-none">
              {totalUsers?.toLocaleString() || 0}
            </span>
            <span className="text-[8px] md:text-[9px] text-zinc-400 uppercase">Total</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shrink-0">
          <span className="text-[7px] md:text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">Today</span>
          <span className="text-xs sm:text-sm md:text-base font-black text-emerald-600 dark:text-emerald-400 tabular-nums leading-none">
            +{todayUsers?.toLocaleString() || 0}
          </span>
        </div>
      </header>

      {/* 그래프 영역: cursor-default를 주어 클릭 가능한 요소가 아님을 암시 */}
      <div className="flex-1 w-full min-h-0 flex flex-col relative cursor-default">
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
                content={({ active, payload }) => (active && payload?.length ? (
                  <div className="bg-zinc-900/95 backdrop-blur-sm text-white p-2 px-3 rounded-lg shadow-2xl text-[10px] border border-zinc-800">
                    <p className="font-bold opacity-50 mb-0.5">{payload[0].payload.date}</p>
                    <p className="text-emerald-400 font-black text-sm">{payload[0].value.toLocaleString()}</p>
                  </div>
                ) : null)}
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
          <div className="flex-1 flex items-center justify-center text-[9px] font-black text-zinc-400 uppercase tracking-widest italic animate-pulse">
            Syncing...
          </div>
        )}
      </div>

      {/* 푸터 */}
      <footer className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 pt-3 shrink-0">
        <div className="flex items-center gap-2 text-zinc-400 min-w-0">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] shrink-0" />
          <span className="text-[8px] font-black uppercase tracking-widest truncate">Google Analytics</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 italic shrink-0">
          <span className="opacity-50">TREND</span>
          <span>UP ↗</span>
        </div>
      </footer>
    </div>
  );
};