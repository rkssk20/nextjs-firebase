import { useRef } from 'react'
import useObserver from '@/hooks/useObserver'
import useArticles from '@/hooks/useArticles'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Profile from '@/components/account/Profile'
import Bar from '@/components/account/Bar'
import Post from '@/components/post/Post'

const Account = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const intersect = useObserver(ref)
  const { loading, articles } = useArticles(intersect)

  return (
    <Layout
      type='profile'
      title='account'
      description=''
      image=''
    >
      {/* アカウント情報 */}
      <Profile />

      {/* ページ選択バー */}
      <Bar />

      {/* 自分の投稿一覧 */}
      { articles.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          lastRef={ ((articles.length - 1) === index) && ref }
        />
      ))}

      { loading && <Circular size='large' /> }
    </Layout>
  )
}

export default Account