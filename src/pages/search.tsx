import { useRouter } from 'next/router'
import Circular from '@/atoms/Circular'
import useObserver from '@/hooks/atoms/useObserver'
import useArticles from '@/hooks/article/useArticles'
import Layout from '@/components/provider/Layout'
import Input from '@/components/search/Input'
import Bar from '@/atoms/Bar'
import Post from '@/components/post/Post'

const Search = () => {
  const { loading, data, Fetch } = useArticles()
  const setRef = useObserver(Fetch)
  const router = useRouter()
  const q = router.query.q

  const tab_list = [
    { name: '投稿', url: `/search${ q ? `?q=${ q }` : '' }` },
    { name: 'ユーザー', url: `/search?${ q ? `q=${ q }&` : '' }sorce=user` }
  ]

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
      <Bar tab_list={ tab_list } value={ Boolean(router.query.sorce) ? 1 : 0 } />

      {/* 検索結果一覧 */}
      { router.query.q ?
        data.map((item, index) => (
          <Post
            key={ item.id }
            data={ item }
            setRef={ ((data.length - 1) === index) && setRef }
          />
        ))
        :
        <p>検索</p>
      }

      { loading && <Circular /> }
    </Layout>
  )
}

export default Search