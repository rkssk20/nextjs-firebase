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
      display_id: 'front_end',
      follow: 1,
      follower: 1,
      mine: true,
      following: false,
    },
    {
      display_id: 'serverless',
      follow: 1,
      follower: 1,
      mine: true,
      following: false,
    },
  ]

  let number: number | null = null

  test_data.filter((item, index) => {
    if (item.display_id === display_id) number = index
  })

  res
    .status(200)
    .json({
      data:
        number !== null
          ? {
              follow: test_data[number].follow,
              follower: test_data[number].follower,
              mine: test_data[number].mine,
              following: test_data[number].following,
            }
          : null,
    })
}
