import { useState } from "react"
import { RepliesType } from "@/types/types"

const useReplies = (path: string, id: number) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<RepliesType[]>([])
  const [page, setPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)

  const MoreFetch = () => {
    if(loading) return
    setLoading(true)

    fetch('/api/testReplies', {
      method: 'POST',
      body: JSON.stringify({
        path,
        id: id,
        page
      })
    }).then(
      res => res.json( )
    ).then((result: { data: RepliesType[] }) => {
      if(result.data.length < 3) setHasNextPage(false)

      setData([...data, ...result.data])
      setPage(page + 1)
    }).catch(
      error => console.log(error)
    ).finally(() => setLoading(false))
  }

  return { loading, data, page, hasNextPage, MoreFetch }
}

export default useReplies