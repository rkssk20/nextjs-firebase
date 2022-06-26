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
    follower: [
      {
        display_id: 'serverless',
        name: 'サーバーレス開発',
      },
      {
        display_id: 'test_a',
        name: '無限スクロール用2',
      },
      {
        display_id: 'test_b',
        name: '無限スクロール用3',
      },
      {
        display_id: 'test_c',
        name: '無限スクロール用4',
      },
      {
        display_id: 'test_d',
        name: '無限スクロール用5',
      },
      {
        display_id: 'test_e',
        name: '無限スクロール用6',
      },
      {
        display_id: 'test_f',
        name: '無限スクロール用7',
      },
      {
        display_id: 'test_g',
        name: '無限スクロール用8',
      },
      {
        display_id: 'test_h',
        name: '無限スクロール用9',
      },
      {
        display_id: 'test_i',
        name: '無限スクロール用10',
      },
      {
        display_id: 'test_j',
        name: '無限スクロール用11',
      },
    ],
  }

  res
    .status(200)
    .json({
      data: { follower: page === 0 ? test_data.follower.slice(0, 10) : [test_data.follower[10]] },
    })
}
