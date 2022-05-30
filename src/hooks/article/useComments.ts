import { useState } from "react"
import { CommentType } from "@/types/types";

type CommentsStatus = CommentType[];

const useComments = (path: string) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<CommentsStatus>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [page, setPage] = useState(0)

  const Fetch = () => {
    if(loading || !hasNextPage) return
    setLoading(true)

    fetch('/api/testComments', {
      method: 'POST',
      body: JSON.stringify({
        question_id: path,
        page
      })
    }).then(
      res => res.json()
    ).then((result: { data: CommentsStatus }) => {
      // 指定した取得数以下 = これ以上ない
      if(result.data.length < 2) {
        setHasNextPage(false)
      }

      setData([...data, ...result.data])
      setPage(page + 1)

    }).catch(error => {
      console.log(error)

    }).finally(
      () => setLoading(false)
    )
  }

  return { loading, data, hasNextPage, Fetch }
}

export default useComments