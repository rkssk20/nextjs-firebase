import { useState, useEffect } from 'react'
import { FollowType } from '@/types/types'

type useFollowerProps = {
  path: string
  intersect: boolean
}

const useFollower = ({ path, intersect }: useFollowerProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<FollowType>([])
  const [hasNextPage, setHasNextPage] = useState(true)

  // 初回読み込み
  useEffect(() => {
    setLoading(true)

    fetch('/api/testFollow', {
      method: 'POST',
      body: JSON.stringify({})
    }).then(
      res => res.json()
    ).then((result: { data: { follow: FollowType } }) => {
      // 指定した取得数以下 = これ以上ない
      if(result.data.follow.length < 10) {
        setHasNextPage(false)
      }

      setData([...data, ...result.data.follow])

    }).catch(error => {
      console.log(error)

    }).finally(
      () => setLoading(false)
    )
  }, [])

  // 追加読み込み
  useEffect(() => {
    // 追加読み込みなしor交差していないor読み込み中は禁止
    if(!hasNextPage || !intersect || loading) return

    const page = data.length === 0 ? null : (data.length === 10) ? 1 : 2

    fetch('/api/testFollow', {
      method: 'POST',
      body: JSON.stringify({ page })
    }).then(
      res => res.json()
    ).then((result: { data: { follow: FollowType } }) => {
      if(result.data.follow.length < 10) {
        setHasNextPage(false)
      }

      setData([...data, ...result.data.follow])

    }).catch(error => {
      console.log(error)

    }).finally(
      () => setLoading(false)
    )
  }, [intersect])

  return { loading, data }
}

export default useFollower