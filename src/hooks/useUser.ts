import { useState, useEffect } from 'react'

type User = {
  display_id: string
  name: string
} | null

const useUser = (path: string) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    fetch('/api/testProfilePage', {
      method: 'POST',
      body: JSON.stringify({ display_id: path })
    })
    .then(res => res.json())
    .then((result: { data: User }) => setUser(result.data))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [])

  return { loading, user }
}

export default useUser