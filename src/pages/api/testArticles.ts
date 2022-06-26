import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = JSON.parse(req.body)

  const test_data = [
    {
      id: '111111111111111111111',
      display_id: 'front_end',
      title: 'Tailwind UI vs Material UI',
      created_at: '2022-04-30 05:00:00.00000',
      image: '/image/back.png',
      likes: 1,
      like: true,
      details: 'Tailwind UIとMaterial UIを選ぶ時に考えること。Tailwind UIの場合は、',
      name: 'フロントエンジニア',
      tags: [0],
      mine: true,
      comments: 1,
    },
    {
      id: '222222222222222222222',
      display_id: 'front_end',
      title: '技術選定',
      created_at: '2022-04-30 04:00:00.00000',
      image: '/image/ginza.png',
      likes: 0,
      like: false,
      details:
        'できるだけサーバーレスで開発したい場合の技術選定を考えます。フロント: Next.js SSRで動的',
      name: 'フロントエンジニア',
      tags: [0, 1],
      mine: true,
      comments: 0,
    },
    {
      id: '333333333333333333333',
      display_id: 'serverless',
      title: 'Hasura vs Prisma',
      created_at: '2022-04-29 04:00:00.00000',
      image: '',
      likes: 0,
      like: true,
      details: 'GraphQLを使用する場合にHasuraとPrismaのどちらを選択するか。Hasuraはバックエ',
      name: 'サーバーレス開発',
      tags: [1],
      mine: false,
      comments: 100,
    },
    {
      id: '444444444444444444444',
      display_id: 'front_end',
      title: 'このサイトについて',
      created_at: '2022-03-30 04:00:00.00000',
      image: '/image/hose.png',
      likes: 1,
      like: false,
      details:
        'このサイトは、Next.jsとサーバーレスを掛け合わせる時のテンプレートです。Next.jsでのIS',
      name: 'フロントエンジニア',
      tags: [],
      mine: true,
      comments: 1000,
    },
    {
      id: '555555555555555555555',
      display_id: 'serverless',
      title: 'Next.jsについて',
      created_at: '2021-04-30 04:00:00.00000',
      image: '',
      likes: 2,
      like: true,
      details: 'Next.jsはSSG, SSR, ISRが使用できます。SSRではアクセスするたびに新しくページを',
      name: 'サーバーレス開発',
      tags: [1],
      mine: false,
      comments: 10000,
    },
    {
      id: '666666666666666666666',
      display_id: 'serverless',
      title: 'Firebaseのデメリット',
      created_at: '2020-04-30 04:00:00.00000',
      image: '',
      likes: 9999,
      like: true,
      details:
        'Firebaseは使いやすいサービスですが、DB周りでRDBとの違いが複数あります。まず、同一レコー',
      name: 'サーバーレス開発',
      tags: [1],
      mine: false,
      comments: 0,
    },
    {
      id: '777777777777777777777',
      display_id: 'front_end',
      title: 'Next.jsをCloud Runにデプロイする理由',
      created_at: '2020-03-01 04:00:00.00000',
      image: '',
      likes: 19999,
      like: true,
      details:
        'Next.jsはVercelにデプロイすると楽ですが、帯域幅の問題があります。帯域幅が一ヶ月に1TB',
      name: 'フロントエンジニア',
      tags: [1],
      mine: false,
      comments: 0,
    },
  ]

  res
    .status(200)
    .json({
      data: !page ? test_data.slice(0, 3) : page === 1 ? test_data.slice(3, 6) : [test_data[6]],
    })
}
