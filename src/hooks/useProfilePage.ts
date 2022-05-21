import { useState, useEffect } from 'react'
import { ProfilePageType } from '@/types/types'

const useProfilePage = (path: string) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ProfilePageType | null>(null)

  useEffect(() => {
    fetch('/api/testProfilePage', {
      method: 'POST',
      body: JSON.stringify({ display_id: path })
    })
    .then(res => res.json())
    .then((result: { data: ProfilePageType }) => {console.log(result);setData(result.data)})
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [])

  return { loading, data }
}

export default useProfilePage