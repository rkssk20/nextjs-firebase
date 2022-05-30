import { useState, useEffect } from "react"
import { ArticleType } from "@/types/types";

type ArticlesStatus = ArticleType[];

const useArticles = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ArticlesStatus>([])
  const [page, setPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)

  // 初回の取得
  useEffect(() => {
    Fetch()
  }, [])
 
  const Fetch = () => {
     // 追加読み込みなしor交差していないor読み込み中は禁止
    if(!hasNextPage || loading) return
 
    fetch('/api/testArticles', {
      method: 'POST',
      body: JSON.stringify({ page })
    }).then(res =>
      res.json()
    ).then((result: { data: ArticlesStatus }) => {
      // これ以上ない場合
      if(result.data.length < 2) {
        setHasNextPage(false)
      }
 
      setData([...data, ...result.data])
      setPage(page + 1)
 
    }).catch(error => {
      console.log(error)
 
    }).finally(() =>
      setLoading(false)
    )
  }

  return { loading, data, Fetch }
}

export default useArticles