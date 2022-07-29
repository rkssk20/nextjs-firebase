import type { NextApiRequest, NextApiResponse } from "next";
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GA_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GA_PRIVATE_KEY?.replace(/\\n/g, '\n')
  }
});

const getTrend = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '2022-06-28',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      dimensionFilter: {
        filter: {
          stringFilter: {
            value: 'article',
            matchType: 'CONTAINS',
          },
          fieldName: 'pagePath',
        },
      },
      metrics: [{
        name: "screenPageViews",
      }],
      limit: 5
    })
    
    // 一日キャッシュ
    res.setHeader('Cache-Control', 's-maxage=86400');
    res.status(200).json({
      response:[{"dimensionValues":[{"value":"/article/wodA79ull1oeWMACFFye","oneValue":"value"}],"metricValues":[{"value":"127","oneValue":"value"}]},{"dimensionValues":[{"value":"/article/8GvdHk8HosMCPD70Ckh0k","oneValue":"value"}],"metricValues":[{"value":"106","oneValue":"value"}]},{"dimensionValues":[{"value":"/article/27mlamD9xm7eXgPD1VfMv","oneValue":"value"}],"metricValues":[{"value":"75","oneValue":"value"}]},{"dimensionValues":[{"value":"/article/07ZpbXAhYzvaBUrd1O6KX","oneValue":"value"}],"metricValues":[{"value":"74","oneValue":"value"}]},{"dimensionValues":[{"value":"/article/EnmX3Rfgxpp8BY6GHQi1i","oneValue":"value"}],"metricValues":[{"value":"67","oneValue":"value"}]}]
    })
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: {
        message: e
      }
    })
  }
}

export default getTrend