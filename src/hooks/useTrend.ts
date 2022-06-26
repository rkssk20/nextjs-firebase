import { useState, useEffect } from 'react'
import { TrendType } from '@/types/types'

const useTrend = () => {
  const [data, setData] = useState<TrendType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) return
    setLoading(true)

    fetch('/api/testTrend')
      .then((res) => res.json())
      .then((result: { data: TrendType[] }) => {
        console.log(result.data)
        if (result.data) {
          setData(result.data)
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, data }
}

export default useTrend
