import { useState, useEffect } from "react"
import { CommentType } from "@/types/types";

type CommentsStatus = CommentType[];

const useComments = (path: string, intersect: boolean) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<CommentsStatus>([])
  const [hasNextPage, setHasNextPage] = useState(true)

  // 初回読み込み
  useEffect(() => {
    setLoading(true)

    fetch('/api/testComments', {
      method: 'POST',
      body: JSON.stringify({
        id: path
      })
    }).then(
      res => res.json()
    ).then((result: { data: CommentsStatus }) => {
      // 指定した取得数以下 = これ以上ない
      if(result.data.length < 2) {
        setHasNextPage(false)
      }

      setData([...data, ...result.data])

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

    const page = data.length === 0 ? null : (data.length === 3) ? 1 : 2

    fetch('/api/testComments', {
      method: 'POST',
      body: JSON.stringify({
        id: path,
        page
      })
    }).then(
      res => res.json()
    ).then((result: { data: CommentsStatus }) => {
      if(result.data.length < 2) {
        setHasNextPage(false)
      }

      setData([...data, ...result.data])

    }).catch(error => {
      console.log(error)

    }).finally(
      () => setLoading(false)
    )
  }, [intersect])

  return { loading, data }
}

export default useComments