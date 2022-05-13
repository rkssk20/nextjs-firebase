import type { NextApiRequest, NextApiResponse } from 'next'

type Response = {
  display_id: string
  name: string
} | {}

export default (req: NextApiRequest, res: NextApiResponse<Response>) => {
  // ログイン時
  // res.status(200).json({ display_id: 'fjauhge', name: 'フロントエンジニア' })
  // ログアウト時
  res.status(200).json({})
}