import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const test_data = [
    {
      id: '111111111111111111111',
      display_id: 'front_end',
      title: 'Tailwind UI vs Material UI',
      image: '/image/back.png',
      name: 'フロントエンジニア',
    },
    {
      id: '222222222222222222222',
      display_id: 'front_end',
      title: '技術選定',
      image: '/image/ginza.png',
      name: 'フロントエンジニア',
    },
    {
      id: '333333333333333333333',
      display_id: 'serverless',
      title: 'Hasura vs Prisma',
      image: '',
      name: 'サーバーレス開発',
    },
    {
      id: '444444444444444444444',
      display_id: 'front_end',
      title: 'このサイトについて',
      image: '/image/hose.png',
      name: 'フロントエンジニア',
    },
    {
      id: '555555555555555555555',
      display_id: 'serverless',
      title: 'Next.jsについて',
      image: '',
      name: 'サーバーレス開発',
    },
  ]

  res.status(200).json({ data: test_data })
}
