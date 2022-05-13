import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = JSON.parse(req.body)

  const test_data = [{
    id: 'fsdf-sdf-s-sdfs',
    display_id: 'fjauhge',
    title: 'Tailwind UI vs Material UI',
    created_at: '2022-04-30 05:00:00.00000',
    image: '/image/back.png',
    likes: 1,
    like: true,
    details: 'Tailwind UIとMaterial UIを選ぶ時に考えること。Tailwind UIの場合は、',
    name: 'フロントエンジニアA',
    tags: [0],
    mine: true
  }, {  
    id: 'fsdf-fsdf-erte-vdf',
    display_id: 'fjauhge',
    title: '技術選定',
    created_at: '2022-04-30 04:00:00.00000',
    image: '/image/ginza.png',
    likes: 0,
    like: false,
    details: 'できるだけサーバーレスで開発したい場合の技術選定を考えます。フロント: Next.js SSRで動的',
    name: 'フロントエンジニアA',
    tags: [0, 1],
    mine: true
  }, {
    id: 'wqerw-fgd-vbcvb',
    display_id: 'wgrgerg',
    title: 'Hasura vs Prisma',
    created_at: '2022-04-29 04:00:00.00000',
    image: '',
    likes: 0,
    like: true,
    details: 'GraphQLを使用する場合にHasuraとPrismaのどちらを選択するか。Hasuraはバックエ',
    name: 'サーバーサイドエンジニア',
    tags: [1],
    mine: false
  }, {
    id: 'wer-jtyj-cvgd',
    display_id: 'fjauhge',
    title: 'このサイトについて',
    created_at: '2022-03-30 04:00:00.00000',
    image: '/image/hose.png',
    likes: 1,
    like: false,
    details: 'このサイトは、Next.jsとサーバーレスを掛け合わせる時のテンプレートです。Next.jsでのIS',
    name: 'フロントエンジニアA',
    tags: [],
    mine: true
  }, {
    id: 'nfghn-kuku-fgsdfg',
    display_id: 'wgrgerg',
    title: 'Next.jsについて',
    created_at: '2021-04-30 04:00:00.00000',
    image: '',
    likes: 2,
    like: true,
    details: 'Next.jsはSSG, SSR, ISRが使用できます。SSRではアクセスするたびに新しくページを',
    name: 'サーバーサイドエンジニア',
    tags: [1],
    mine: false
  }, {
    id: 'nfghn-revure-tttttg',
    display_id: 'wgrgerg',
    title: 'Firebaseのデメリット',
    created_at: '2020-04-30 04:00:00.00000',
    image: '',
    likes: 9999,
    like: true,
    details: 'Firebaseは使いやすいサービスですが、DB周りでRDBとの違いが複数あります。まず、同一レコー',
    name: 'サーバーサイドエンジニア',
    tags: [1],
    mine: false
  }, {
    id: 'nfghn-ggrtgt-fgsdfg',
    display_id: 'ljofjauhgeihfgh',
    title: 'Next.jsをCloud Runにデプロイする理由',
    created_at: '2020-03-01 04:00:00.00000',
    image: '',
    likes: 19999,
    like: true,
    details: 'Next.jsはVercelにデプロイすると楽ですが、帯域幅の問題があります。帯域幅が一ヶ月に1TB',
    name: 'フロントエンジニア',
    tags: [1],
    mine: false
  }]

  let number: number | null = null;

  test_data.filter((item, index) => {
    if(item.id === id) number = index
  })

  res.status(200).json({ data: (number !== null) ? test_data[number] : null })
}