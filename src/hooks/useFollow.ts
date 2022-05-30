import { useEffect, useState } from 'react'
import { FollowType } from '@/types/types'

const useFollower = (display_id: string) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<FollowType>([])
  const [page, setPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)

  // 初回
  useEffect(() => {
    Fetch()
  }, [])

  const Fetch = () => {
    if(!hasNextPage || loading) return
    setLoading(true)

    fetch('/api/testFollow', {
      method: 'POST',
      body: JSON.stringify({ display_id, page })
    }).then(res =>
      res.json()
    ).then((result: { data: { follow: FollowType } }) => {
      // これ以上ない場合
      if(result.data.follow.length < 10) {
        setHasNextPage(false)
      }

      setData([...data, ...result.data.follow])
      setPage(page + 1)

    }).catch(error => {
      console.log(error)

    }).finally(
      () => setLoading(false)
    )
  }

  return { loading, data, Fetch }
}

export default useFollower