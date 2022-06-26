import type { NextApiRequest, NextApiResponse } from 'next'

type Response =
  | {
      display_id: string
      name: string
    }
  | {}

export default (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { display_id, page } = JSON.parse(req.body)

  const test_data = {
    display_id: 'front_end',
    follow: [],
  }

  res.status(200).json({ data: { follow: [] } })
}
