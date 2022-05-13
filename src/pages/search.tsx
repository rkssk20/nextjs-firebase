import { useRef } from 'react'
import { useRouter } from 'next/router'
import Circular from '@/atoms/Circular'
import useObserver from '@/hooks/useObserver'
import useArticles from '@/hooks/useArticles'
import Layout from '@/components/provider/Layout'
import Input from '@/components/search/Input'
import Bar from '@/components/search/Bar'
import Post from '@/components/post/Post'

const Search = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const intersect = useObserver(ref)
  const { loading, articles } = useArticles(intersect)
  const router = useRouter()

  return (
    <Layout
      type='article'
      title={
        router.query.q ?
        router.query.q + 'の検索結果' : '検索'
      }
      description=''
      image=''
    >
      {/* 検索欄と検索履歴 */}
      <Input />

      {/* 検索対象の選択バー */}
      <Bar />

      {/* 検索結果一覧 */}
      { router.query.q ?
        articles.map((item, index) => (
          <Post
            key={ item.id }
            data={ item }
            lastRef={ ((articles.length - 1) === index) && ref }
          />
        ))
        :
        <p>検索</p>
      }

      { loading && <Circular size='large' /> }
    </Layout>
  )
}

export default Search