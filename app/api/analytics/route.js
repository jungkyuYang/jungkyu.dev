import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
  },
});

export async function GET() {
  const propertyIds = {
    PORTFOLIO: process.env.GA_PROPERTY_ID_PORTFOLIO,
    CHATBOT: process.env.GA_PROPERTY_ID_CHATBOT,
    WEATHER_APP: process.env.GA_PROPERTY_ID_WEATHER_APP,
  };

  try {
    const requests = Object.entries(propertyIds).map(async ([key, id]) => {
      if (!id) return { key, data: { rows: [], totals: [] } };

      const [response] = await analyticsDataClient.runReport({
        property: `properties/${id}`,
        // 누적 데이터와 최근 7일 데이터를 동시에 커버하기 위해 기간 설정
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
    return Response.json({ error: error.message }, { status: 500 });
  }
}