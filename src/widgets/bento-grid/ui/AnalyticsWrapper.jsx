import { Analytics } from './Analytics';

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

async function getGAData() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/analytics`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch GA data');
  return res.json();
}

export const AnalyticsWrapper = async () => {
  try {
    const allData = await getGAData();

    // 1. 전체 누적 유저 (3개 프로젝트 통합)
    let totalAccumulatedUsers = 0;
    Object.values(allData).forEach((project) => {
      project.rows?.forEach((row) => {
        totalAccumulatedUsers += parseInt(row.metricValues[0].value || 0);
      });
    });

    // 2. 통합 '오늘' 방문자 수 추출 (3개 프로젝트 합산)
    const todayStr = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(new Date())
      .replace(/\. /g, '')
      .replace(/\./g, '');

    let networkTodayUsers = 0;
    Object.values(allData).forEach((project) => {
      const todayRow = project.rows?.find((r) => r.dimensionValues[0].value === todayStr);
      if (todayRow) networkTodayUsers += parseInt(todayRow.metricValues[0].value || 0);
    });

    // 3. 누적 데이터 가공 (기존과 동일)
    const dailyMap = {};
    Object.values(allData).forEach((project) => {
      project.rows?.forEach((row) => {
        const date = row.dimensionValues[0].value;
        const count = parseInt(row.metricValues[0].value || 0);
        dailyMap[date] = (dailyMap[date] || 0) + count;
      });
    });

    const sortedDates = Object.keys(dailyMap).sort();
    let runningTotal = 0;
    const cumulativeData = sortedDates.map((date) => {
      runningTotal += dailyMap[date];
      return {
        rawDate: date,
        date: `${date.slice(4, 6)}.${date.slice(6, 8)}`,
        users: runningTotal,
      };
    });

    const chartData = cumulativeData.slice(-7);

    return (
      <Analytics
        totalUsers={totalAccumulatedUsers}
        todayUsers={networkTodayUsers}
        chartData={chartData}
      />
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="p-5 text-[10px] font-black tracking-widest uppercase opacity-50">
        Network Stats Offline
      </div>
    );
  }
};
