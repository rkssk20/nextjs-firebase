import type { NextApiRequest, NextApiResponse } from 'next'

type Response =
  | {
      display_id: string
      name: string
    }
  | {}

export default (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { display_id } = JSON.parse(req.body)

  const test_data = [
    {
      image: '',
      name: 'フロントエンジニア',
      display_id: 'front_end',
      details: 'フロントエンジニアのアカウント。Next.jsを使用して開発します。',
    },
    {
      image: '/image/hose.png',
      name: 'サーバーレス開発',
      display_id: 'serverless',
      details: 'サーバーレスで開発するエンジニアのアカウント。今回はsupabaseを使用します。',
    },
  ]

  let number: number | null = null

  test_data.filter((item, index) => {
    if (item.display_id === display_id) number = index
  })

  res.status(200).json({ data: number !== null ? test_data[number] : null })
}
