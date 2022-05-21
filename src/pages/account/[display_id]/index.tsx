import type { GetStaticProps, GetStaticPaths } from 'next'
import { ProfilePageType } from '@/types/types'
import useProfileDetails from '@/hooks/useProfileDetails'
import useObserver from '@/hooks/useObserver'
import useArticles from '@/hooks/useArticles'
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

const Account = ({ item , path }: AccountProps) => {
  const { loading: profile_loading, data: profile_data } = useProfileDetails(path)
  const { intersect, setRef } = useObserver()
  const { loading, articles } = useArticles(intersect)

  return (
    <Layout
      type='profile'
      title={ item.name }
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

      {/* 自分の投稿一覧 */}
      { articles.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ ((articles.length - 1) === index) && setRef }
        />
      ))}

      { (loading || profile_loading) && <Circular size='large' /> }
    </Layout>
  )
}

export default Account