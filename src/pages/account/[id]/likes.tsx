import type { GetStaticProps, GetStaticPaths } from 'next'
import { ProfilePageType } from '@/types/types'
import useProfileDetails from '@/hooks/useProfileDetails'
import useObserver from '@/hooks/atoms/useObserver'
import useArticles from '@/hooks/article/useArticles'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Profile from '@/components/account/Profile'
import Bar from '@/components/account/Bar'
import Post from '@/components/post/Post'

// ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const display_id = params?.display_id

  if(!display_id) return { notFound: true }

  const article = await fetch(`${ process.env.NEXT_PUBLIC_WEB_URL }/api/testProfilePage`, {
    method: 'POST',
    body: JSON.stringify({ display_id })
  })

  const result = await article.json()

  if(!result.data) return { notFound: true }

  return {
    props: {
      item: result.data,
      path: display_id
    },
    // 5分キャッシュ
    revalidate: 300
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

type AccountProps = {
  item: ProfilePageType
  path: string
}

const Likes = ({ item, path }: AccountProps) => {
  const { loading: profile_loading, data: profile_data } = useProfileDetails(path)
  const { loading, data, Fetch } = useArticles()
  const setRef = useObserver(Fetch)
  
  return (
    <Layout
      type='profile'
      title={ item.name + 'がいいねした投稿一覧' }
      description={ item.details }
      image=''
    >
      {/* アカウント情報 */}
      { profile_data &&
        <Profile
          path={ path }
          data={ profile_data }
          name={ item.name }
          details={ item.details }
        />
      }
      
      {/* ページ選択バー */}
      <Bar />

      {/* いいねした投稿一覧 */}
      { data.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ ((data.length - 1) === index) && setRef }
        />
      ))}

      { loading && <Circular /> }
    </Layout>
  )
}

export default Likes