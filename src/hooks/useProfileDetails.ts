import { useState, useEffect } from 'react'
import { ProfileDetailsType } from '@/types/types'

const useProfileDetails = (path: string) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ProfileDetailsType | null>(null)

  useEffect(() => {
    fetch('/api/testProfileDetails', {
      method: 'POST',
      body: JSON.stringify({ display_id: path })
    })
    .then(res => res.json())
    .then((result: { data: ProfileDetailsType }) => setData(result.data))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [])

  return { loading, data }
}

export default useProfileDetails