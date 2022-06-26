import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page } = JSON.parse(req.body)

  const test_data = [
    {
      id: 1,
      comment_id: 1,
      display_id: 'front_end',
      created_at: '2022-04-30 05:00:00.00000',
      image: '/image/back.png',
      likes: 1,
      like: true,
      content: 'Tailwind UIとMaterial UIを選ぶ時に考えること。Tailwind UIの場合は、',
      name: 'フロントエンジニア',
      mine: true,
    },
    {
      id: 2,
      comment_id: 1,
      display_id: 'front_end',
      created_at: '2022-04-30 04:00:00.00000',
      image: '/image/ginza.png',
      likes: 0,
      like: false,
      content:
        'できるだけサーバーレスで開発したい場合の技術選定を考えます。フロント: Next.js SSRで動的',
      name: 'フロントエンジニア',
      mine: true,
    },
    {
      id: 3,
      comment_id: 1,
      display_id: 'serverless',
      created_at: '2022-04-29 04:00:00.00000',
      image: '',
      likes: 0,
      like: true,
      content: 'GraphQLを使用する場合にHasuraとPrismaのどちらを選択するか。Hasuraはバックエ',
      name: 'サーバーレス開発',
      mine: false,
    },
    {
      id: 4,
      comment_id: 1,
      display_id: 'front_end',
      created_at: '2022-03-30 04:00:00.00000',
      image: '/image/hose.png',
      likes: 1,
      like: false,
      content:
        'このサイトは、Next.jsとサーバーレスを掛け合わせる時のテンプレートです。Next.jsでのIS',
      name: 'フロントエンジニア',
      mine: true,
    },
    {
      id: 5,
      comment_id: 1,
      display_id: 'serverless',
      created_at: '2021-04-30 04:00:00.00000',
      image: '',
      likes: 2,
      like: true,
      content: 'Next.jsはSSG, SSR, ISRが使用できます。SSRではアクセスするたびに新しくページを',
      name: 'サーバーレス開発',
      mine: false,
    },
    {
      id: 6,
      comment_id: 1,
      display_id: 'serverless',
      created_at: '2020-04-30 04:00:00.00000',
      image: '',
      likes: 9999,
      like: true,
      content:
        'Firebaseは使いやすいサービスですが、DB周りでRDBとの違いが複数あります。まず、同一レコー',
      name: 'サーバーレス開発',
      mine: false,
    },
    {
      id: 7,
      comment_id: 1,
      display_id: 'front_end',
      created_at: '2020-03-01 04:00:00.00000',
      image: '',
      likes: 19999,
      like: true,
      content:
        'Next.jsはVercelにデプロイすると楽ですが、帯域幅の問題があります。帯域幅が一ヶ月に1TB',
      name: 'フロントエンジニア',
      mine: true,
    },
  ]

  res
    .status(200)
    .json({
      data:
        page === 0
          ? test_data.slice(0, 3)
          : page === 1
          ? test_data.slice(3, 6)
          : page === 2
          ? [test_data[6]]
          : undefined,
    })
}
