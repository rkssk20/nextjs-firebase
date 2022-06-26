import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { question_id, page } = JSON.parse(req.body)

  const test_data = [
    {
      id: 1,
      display_id: 'front_end',
      created_at: '2022-04-30 05:00:00.00000',
      image: '/image/back.png',
      likes: 1,
      like: true,
      content: 'Tailwind UIとMaterial UIを選ぶ時に考えること。Tailwind UIの場合は、',
      name: 'フロントエンジニア',
      mine: true,
      replies: 1,
    },
    {
      id: 2,
      display_id: 'front_end',
      created_at: '2022-04-30 04:00:00.00000',
      image: '/image/ginza.png',
      likes: 0,
      like: false,
      content:
        'できるだけサーバーレスで開発したい場合の技術選定を考えます。フロント: Next.js SSRで動的',
      name: 'フロントエンジニア',
      mine: true,
      replies: 0,
    },
    {
      id: 3,
      display_id: 'serverless',
      created_at: '2022-04-29 04:00:00.00000',
      image: '',
      likes: 0,
      like: true,
      content: 'GraphQLを使用する場合にHasuraとPrismaのどちらを選択するか。Hasuraはバックエ',
      name: 'サーバーレス開発',
      mine: false,
      replies: 100,
    },
    {
      id: 4,
      display_id: 'front_end',
      created_at: '2022-03-30 04:00:00.00000',
      image: '/image/hose.png',
      likes: 1,
      like: false,
      content:
        'このサイトは、Next.jsとサーバーレスを掛け合わせる時のテンプレートです。Next.jsでのIS',
      name: 'フロントエンジニア',
      mine: true,
      replies: 1000,
    },
    {
      id: 5,
      display_id: 'serverless',
      created_at: '2021-04-30 04:00:00.00000',
      image: '',
      likes: 2,
      like: true,
      content: 'Next.jsはSSG, SSR, ISRが使用できます。SSRではアクセスするたびに新しくページを',
      name: 'サーバーレス開発',
      mine: false,
      replies: 10000,
    },
    {
      id: 6,
      display_id: 'serverless',
      created_at: '2020-04-30 04:00:00.00000',
      image: '',
      likes: 9999,
      like: true,
      content:
        'Firebaseは使いやすいサービスですが、DB周りでRDBとの違いが複数あります。まず、同一レコー',
      name: 'サーバーレス開発',
      mine: false,
      replies: 0,
    },
    {
      id: 7,
      display_id: 'front_end',
      created_at: '2020-03-01 04:00:00.00000',
      image: '',
      likes: 19999,
      like: true,
      content:
        'Next.jsはVercelにデプロイすると楽ですが、帯域幅の問題があります。帯域幅が一ヶ月に1TB',
      name: 'フロントエンジニア',
      mine: true,
      replies: 0,
    },
  ]

  res
    .status(200)
    .json({
      data:
        page === 0 ? test_data.slice(0, 3) : page === 1 ? test_data.slice(3, 6) : [test_data[6]],
    })
}
