import type { NextApiRequest, NextApiResponse } from "next";
import { BetaAnalyticsDataClient } from '@google-analytics/data'
// const credentialsJsonPath = '../credential.json'

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GA_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GA_PRIVATE_KEY?.replace("\\n", "\n")
  }
});

const getTrend = async (req: NextApiRequest, res: NextApiResponse) => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: '30daysAgo',
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

  res.status(200).json({
    response
  })
}

export default getTrend