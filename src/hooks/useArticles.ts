import { useState, useEffect } from "react"
import { ArticleType } from "@/types/types";

type ArticlesStatus = ArticleType[];

const useArticles = (intersect: boolean) => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<ArticlesStatus>([])
  const [hasNextPage, setHasNextPage] = useState(true)

  // 初回読み込み
  useEffect(() => {
    setLoading(true)

    fetch('/api/testArticles', {
      method: 'POST',
      body: JSON.stringify({})
    }).then(
      res => res.json()
    ).then((result: { data: ArticlesStatus }) => {
      // 指定した取得数以下 = これ以上ない
      if(result.data.length < 2) {
        setHasNextPage(false)
      }

      setArticles([...articles, ...result.data])

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

    const page = articles.length === 0 ? null : (articles.length === 3) ? 1 : 2

    fetch('/api/testArticles', {
      method: 'POST',
      body: JSON.stringify({ page })
    }).then(
      res => res.json()
    ).then((result: { data: ArticlesStatus }) => {
      if(result.data.length < 2) {
        setHasNextPage(false)
      }

      setArticles([...articles, ...result.data])

    }).catch(error => {
      console.log(error)

    }).finally(
      () => setLoading(false)
    )
  }, [intersect])

  return { loading, articles }
}

export default useArticles