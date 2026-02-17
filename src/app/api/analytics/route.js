import { BetaAnalyticsDataClient } from '@google-analytics/data';

// 1. 키 형식을 완벽하게 잡아주는 함수
const getCleanKey = (key) => {
  if (!key) return undefined;
  return key
    .replace(/^["']|["']$/g, '') // 앞뒤 따옴표 (" 또는 ') 제거
    .replace(/\\n/g, '\n'); // 문자열 형태의 \n을 실제 줄바꿈으로 변경
};

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: getCleanKey(process.env.GA_PRIVATE_KEY), // 수정된 부분
  },
});

export async function GET() {
  const propertyIds = {
    PORTFOLIO: process.env.GA_PROPERTY_ID_PORTFOLIO,
    CHATBOT: process.env.GA_PROPERTY_ID_CHATBOT,
    WEATHER_APP: process.env.GA_PROPERTY_ID_WEATHER_APP,
  };

  try {
    // 환경변수 로딩 확인 로그 (Vercel 로그에서 확인용)
    if (!process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY) {
      console.error('Missing Env: EMAIL or KEY is undefined');
      return Response.json({ error: 'Missing Env' }, { status: 401 });
    }

    const requests = Object.entries(propertyIds).map(async ([key, id]) => {
      if (!id) return { key, data: { rows: [], totals: [] } };

      const [response] = await analyticsDataClient.runReport({
        property: `properties/${id}`,
        dateRanges: [{ startDate: '2025-01-01', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }],
        dimensions: [{ name: 'date' }],
      });
      return { key, data: response };
    });

    const results = await Promise.all(requests);
    const combinedData = results.reduce((acc, curr) => {
      acc[curr.key] = curr.data;
      return acc;
    }, {});

    return Response.json(combinedData);
  } catch (error) {
    // 에러 발생 시 로그를 상세히 남깁니다.
    console.error('GA API Error Details:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
